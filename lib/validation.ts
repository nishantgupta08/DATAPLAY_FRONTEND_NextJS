// Validation utilities and schemas
export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

export class Validator {
  static email(email: string): ValidationResult {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return {
      isValid: emailRegex.test(email),
      errors: emailRegex.test(email) ? [] : ['Invalid email format']
    };
  }

  static phone(phone: string): ValidationResult {
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    return {
      isValid: phoneRegex.test(phone.replace(/\s/g, '')),
      errors: phoneRegex.test(phone.replace(/\s/g, '')) ? [] : ['Invalid phone number format']
    };
  }

  static required(value: unknown, fieldName: string): ValidationResult {
    return {
      isValid: value !== null && value !== undefined && value !== '',
      errors: (value !== null && value !== undefined && value !== '') ? [] : [`${fieldName} is required`]
    };
  }

  static minLength(value: string, minLength: number, fieldName: string): ValidationResult {
    return {
      isValid: value.length >= minLength,
      errors: value.length >= minLength ? [] : [`${fieldName} must be at least ${minLength} characters`]
    };
  }

  static maxLength(value: string, maxLength: number, fieldName: string): ValidationResult {
    return {
      isValid: value.length <= maxLength,
      errors: value.length <= maxLength ? [] : [`${fieldName} must be no more than ${maxLength} characters`]
    };
  }

  static validateForm(data: Record<string, unknown>, rules: Record<string, Array<(value: unknown, fieldName: string) => ValidationResult>>): ValidationResult {
    const errors: string[] = [];
    
    for (const [field, fieldRules] of Object.entries(rules)) {
      const value = data[field];
      
      for (const rule of fieldRules) {
        const result = rule(value, field);
        if (!result.isValid) {
          errors.push(...result.errors);
        }
      }
    }
    
    return {
      isValid: errors.length === 0,
      errors
    };
  }
}

// Common validation rules
export const validationRules = {
  email: (value: string) => Validator.email(value),
  phone: (value: string) => Validator.phone(value),
  required: (value: unknown, fieldName: string) => Validator.required(value, fieldName),
  name: (value: string) => Validator.minLength(value, 2, 'Name'),
  message: (value: string) => Validator.minLength(value, 10, 'Message'),
};
