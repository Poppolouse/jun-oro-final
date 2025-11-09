# Coding Standards – Jun-Oro v2

Dosya/fonksiyon boyutları, isimlendirme, yorum ve error handling kuralları:

## Boyutlar
- Dosya: ideal ≤ 300 satır
- Fonksiyon: ideal ≤ 50 satır

## Naming
- Değişkenler: camelCase
- Fonksiyonlar: fiil ile başla (getUserById, handleClick)
- Boolean: is/has soru formatı (isActive, hasPermission)
- Constants: UPPER_SNAKE_CASE
- Components: PascalCase

## Comments
/**
 * Fonksiyonun ne yaptığını tek cümle ile açıkla.
 * Detay gerekiyorsa ek satırlarda belirt.
 * @param {type} name - açıklama
 * @returns {type} açıklama
 */
- Her public fonksiyon üstünde comment.
- Complex logic’lerde satır arası açıklama.
- TODO ve FIXME kullan.

## Clean Code
- DRY, Single Responsibility, Early Return.
- Magic numbers → constants.

## Error Handling
- Her async fonksiyonda try-catch.
- Log’a detaylı, kullanıcıya basit mesaj.
- Input validation (frontend + backend).