// Validation utility for checkout form

type Form = Record<string, string>;

type Rule = {
  validate: (value: string, form: Form) => boolean;
  message: string;
};

const rules: Record<string, Rule[]> = {
  fullName: [
    { validate: v => !!v, message: "Full Name is required" }
  ],
  email: [
    { validate: v => !!v, message: "Email is required" },
    { validate: v => /^\S+@\S+\.\S+$/.test(v), message: "Valid email required" }
  ],
  phone: [
    { validate: v => !!v, message: "Phone required" },
    { validate: v => /^\d{10,15}$/.test(v), message: "Valid phone required" }
  ],
  address: [
    { validate: v => !!v, message: "Address required" }
  ],
  city: [
    { validate: v => !!v, message: "City required" }
  ],
  state: [
    { validate: v => !!v, message: "State required" }
  ],
  zip: [
    { validate: v => !!v, message: "Zip required" }
  ],
  cardNumber: [
    { validate: v => !!v, message: "Card required" },
    { validate: v => /^\d{16}$/.test(v), message: "16-digit card required" }
  ],
  expiry: [
    { validate: v => !!v, message: "Expiry required" },
    { validate: v => /^\d{2}\/\d{2}$/.test(v), message: "MM/YY required" },
    { 
      validate: v => {
        if (!/^\d{2}\/\d{2}$/.test(v)) return false;
        const [mm, yy] = v.split("/").map(Number);
        const now = new Date();
        const expDate = new Date(2000 + yy, mm - 1);
        return expDate >= now;
      },
      message: "Expiry must be in the future"
    }
  ],
  cvv: [
    { validate: v => !!v, message: "CVV required" },
    { validate: v => /^\d{3}$/.test(v), message: "3-digit CVV required" }
  ]
};

export function validateCheckout(form: Form): Record<string, string> {
  const errors: Record<string, string> = {};
  for (const field in rules) {
    for (const rule of rules[field]) {
      if (!rule.validate(form[field], form)) {
        errors[field] = rule.message;
        break;
      }
    }
  }
  return errors;
} 