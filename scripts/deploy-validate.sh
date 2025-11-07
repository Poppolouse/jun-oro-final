#!/bin/bash

# Deployment Validation Script for Neumorphism Portfolio Website
# This script validates that the deployment is working correctly

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
SITE_URL="${SITE_URL:-http://localhost:8080}"
TIMEOUT=30
RETRY_COUNT=3

# Functions
log_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

log_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

log_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if site is accessible
check_site_accessibility() {
    log_info "Checking site accessibility at $SITE_URL"
    
    for i in $(seq 1 $RETRY_COUNT); do
        if curl -s -o /dev/null -w "%{http_code}" --connect-timeout $TIMEOUT "$SITE_URL" | grep -q "200"; then
            log_success "Site is accessible (HTTP 200)"
            return 0
        else
            log_warning "Attempt $i/$RETRY_COUNT: Site not accessible, retrying..."
            sleep 5
        fi
    done
    
    log_error "Site is not accessible after $RETRY_COUNT attempts"
    return 1
}

# Check SSL certificate
check_ssl() {
    if [[ "$SITE_URL" == https://* ]]; then
        log_info "Checking SSL certificate"
        
        domain=$(echo "$SITE_URL" | sed 's|https://||' | sed 's|/.*||')
        
        if openssl s_client -connect "$domain:443" -servername "$domain" < /dev/null 2>/dev/null | openssl x509 -noout -dates 2>/dev/null | grep -q "notAfter"; then
            log_success "SSL certificate is valid"
            return 0
        else
            log_error "SSL certificate check failed"
            return 1
        fi
    else
        log_warning "Skipping SSL check (HTTP site)"
        return 0
    fi
}

# Check performance
check_performance() {
    log_info "Checking site performance"
    
    # Check load time
    load_time=$(curl -o /dev/null -s -w "%{time_total}" --connect-timeout $TIMEOUT "$SITE_URL")
    
    if (( $(echo "$load_time < 3.0" | bc -l) )); then
        log_success "Load time: ${load_time}s (good)"
    elif (( $(echo "$load_time < 5.0" | bc -l) )); then
        log_warning "Load time: ${load_time}s (acceptable)"
    else
        log_error "Load time: ${load_time}s (too slow)"
        return 1
    fi
    
    # Check response size
    response_size=$(curl -s -o /dev/null -w "%{size_download}" --connect-timeout $TIMEOUT "$SITE_URL")
    
    if [ "$response_size" -lt 1000000 ]; then  # Less than 1MB
        log_success "Response size: $(($response_size / 1024))KB (good)"
    else
        log_warning "Response size: $(($response_size / 1024))KB (large)"
    fi
}

# Check security headers
check_security_headers() {
    log_info "Checking security headers"
    
    # Get headers
    headers=$(curl -s -I --connect-timeout $TIMEOUT "$SITE_URL")
    
    # Check required security headers
    security_headers=(
        "X-Frame-Options"
        "X-XSS-Protection"
        "X-Content-Type-Options"
        "Referrer-Policy"
    )
    
    missing_headers=0
    
    for header in "${security_headers[@]}"; do
        if echo "$headers" | grep -qi "$header"; then
            log_success "Security header present: $header"
        else
            log_warning "Missing security header: $header"
            ((missing_headers++))
        fi
    done
    
    if [ "$missing_headers" -eq 0 ]; then
        log_success "All required security headers present"
        return 0
    else
        log_warning "$missing_headers security headers missing"
        return 1
    fi
}

# Check PWA features
check_pwa_features() {
    log_info "Checking PWA features"
    
    # Check service worker
    if curl -s -o /dev/null -w "%{http_code}" --connect-timeout $TIMEOUT "$SITE_URL/sw.js" | grep -q "200"; then
        log_success "Service Worker accessible"
    else
        log_warning "Service Worker not accessible"
    fi
    
    # Check manifest
    if curl -s -o /dev/null -w "%{http_code}" --connect-timeout $TIMEOUT "$SITE_URL/manifest.json" | grep -q "200"; then
        log_success "PWA Manifest accessible"
    else
        log_warning "PWA Manifest not accessible"
    fi
    
    # Check manifest content
    manifest_content=$(curl -s --connect-timeout $TIMEOUT "$SITE_URL/manifest.json")
    if echo "$manifest_content" | jq -e '.name and .start_url' > /dev/null 2>&1; then
        log_success "PWA Manifest valid"
        return 0
    else
        log_warning "PWA Manifest invalid"
        return 1
    fi
}

# Check health endpoint
check_health_endpoint() {
    log_info "Checking health endpoint"
    
    if curl -s -o /dev/null -w "%{http_code}" --connect-timeout $TIMEOUT "$SITE_URL/health.html" | grep -q "200"; then
        log_success "Health endpoint accessible"
        return 0
    else
        log_warning "Health endpoint not accessible"
        return 1
    fi
}

# Check mobile responsiveness
check_mobile_responsiveness() {
    log_info "Checking mobile responsiveness"
    
    # Check viewport meta tag
    if curl -s --connect-timeout $TIMEOUT "$SITE_URL" | grep -q 'viewport.*width=device-width'; then
        log_success "Viewport meta tag present"
        return 0
    else
        log_warning "Viewport meta tag missing"
        return 1
    fi
}

# Check accessibility
check_accessibility() {
    log_info "Checking basic accessibility"
    
    # Check for skip link
    if curl -s --connect-timeout $TIMEOUT "$SITE_URL" | grep -q 'skip-link'; then
        log_success "Skip link present"
    else
        log_warning "Skip link missing"
    fi
    
    # Check for alt text on images
    page_content=$(curl -s --connect-timeout $TIMEOUT "$SITE_URL")
    img_count=$(echo "$page_content" | grep -c '<img')
    alt_count=$(echo "$page_content" | grep -c 'alt=')
    
    if [ "$img_count" -eq "$alt_count" ] && [ "$img_count" -gt 0 ]; then
        log_success "All images have alt text"
        return 0
    elif [ "$img_count" -eq 0 ]; then
        log_success "No images found (or all images are CSS backgrounds)"
        return 0
    else
        log_warning "Some images missing alt text ($alt_count/$img_count)"
        return 1
    fi
}

# Check SEO
check_seo() {
    log_info "Checking SEO basics"
    
    page_content=$(curl -s --connect-timeout $TIMEOUT "$SITE_URL")
    
    # Check title
    if echo "$page_content" | grep -q '<title>'; then
        log_success "Page title present"
    else
        log_warning "Page title missing"
    fi
    
    # Check meta description
    if echo "$page_content" | grep -q 'name="description"'; then
        log_success "Meta description present"
    else
        log_warning "Meta description missing"
    fi
    
    # Check heading structure
    h1_count=$(echo "$page_content" | grep -c '<h1')
    if [ "$h1_count" -eq 1 ]; then
        log_success "Proper H1 structure (1 H1 tag)"
    else
        log_warning "Improper H1 structure ($h1_count H1 tags)"
    fi
}

# Main validation function
main() {
    echo "🚀 Neumorphism Portfolio Deployment Validation"
    echo "================================================"
    echo "Site URL: $SITE_URL"
    echo "Timestamp: $(date)"
    echo ""
    
    # Run all checks
    checks_passed=0
    total_checks=9
    
    check_site_accessibility && ((checks_passed++))
    check_ssl && ((checks_passed++))
    check_performance && ((checks_passed++))
    check_security_headers && ((checks_passed++))
    check_pwa_features && ((checks_passed++))
    check_health_endpoint && ((checks_passed++))
    check_mobile_responsiveness && ((checks_passed++))
    check_accessibility && ((checks_passed++))
    check_seo && ((checks_passed++))
    
    echo ""
    echo "================================================"
    echo "📊 Validation Results"
    echo "================================================"
    echo "Checks passed: $checks_passed/$total_checks"
    
    if [ "$checks_passed" -eq "$total_checks" ]; then
        log_success "🎉 All validation checks passed! Deployment is ready for production."
        exit 0
    elif [ "$checks_passed" -ge 7 ]; then
        log_warning "⚠️ Most checks passed, but some issues need attention."
        exit 1
    else
        log_error "❌ Multiple validation checks failed. Please review and fix issues."
        exit 2
    fi
}

# Check dependencies
if ! command -v curl &> /dev/null; then
    log_error "curl is required but not installed. Please install curl."
    exit 3
fi

if ! command -v openssl &> /dev/null; then
    log_error "openssl is required but not installed. Please install openssl."
    exit 3
fi

if ! command -v jq &> /dev/null; then
    log_error "jq is required but not installed. Please install jq."
    exit 3
fi

if ! command -v bc &> /dev/null; then
    log_error "bc is required but not installed. Please install bc."
    exit 3
fi

# Run main function
main "$@"