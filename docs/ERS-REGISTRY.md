# ERS Registry – Jun-Oro v2

ERS kod formatı: PAGE.SECTION.CONTAINER.ELEMENT

## Portal Page (Root Domain)
- ERS: 1 (HomePage)
  - Section 3: Body
    - Container 1: AppGrid
      - Elements: AppCard’lar

| ERS | Element | Dosya | Parent | Children | Props | Tasarım |
|-----|---------|-------|--------|----------|-------|---------|
| 1.3.1 | AppGrid | apps/portal/src/App.tsx (satır ~30) | HomePage | AppCard[*] | apps list | Card bg: #EEEAE4, hover lift |
| 1.3.1.1 | AppCard (1) | apps/portal/src/components/AppCard.tsx | AppGrid | – | title, href, description | Neumorphism shadow |