# Troubleshooting Guide

## Common Issues

### Build Errors

Problem: Build fails with module not found
Solution:
1. Clear node_modules and package-lock.json
2. Run `npm install`
3. Retry build

### State Management

Problem: State updates not reflecting
Solution:
1. Check store subscription
2. Verify action dispatches
3. Check component re-rendering

### Booking Calendar

Problem: Date selection issues
Solution:
1. Check date format consistency
2. Verify timezone handling
3. Validate date comparison logic

### Form Validation

Problem: Form submission fails
Solution:
1. Check form validation rules
2. Verify required fields
3. Test error handling

## Getting Help

1. Check the documentation
2. Review component props
3. Verify state management
4. Check browser console
5. Review network requests