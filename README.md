# Survey Application Frontend

A multi-step survey application built with React, TypeScript, and Tailwind CSS that collects user information through a structured form process and displays submissions in a tabular format.

## Features

### Multi-Step Form
- **Personal Information**
  - First Name
  - Last Name
  - Date of Birth

- **Contact Information**
  - Email
  - Phone Number
  - ZIP Code

- **Health Information**
  - Chronic Conditions Status
  - Condition Details (if applicable)
  - Smoking Status

- **Financial Information**
  - Annual Income
  - Savings Status
  - Insurance Status

### Key Features
- Progressive form completion with validation
- Real-time input validation
- Progress tracking
- Responsive design
- Toast notifications for feedback
- Applications list view
- Form data review page

## Tech Stack

- **React** - Frontend framework
- **TypeScript** - Type safety and better development experience
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Navigation and routing
- **Axios** - API requests
- **React-Toastify** - Toast notifications
- **Context API** - State management

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone [repository-url]
```

2. Install dependencies
```bash
npm install
# or
yarn install
```

3. Create a `.env` file in the root directory
```env
VITE_API_BASE_URL=http://localhost:8000/api/v1
```

4. Start the development server
```bash
npm run dev
# or
yarn dev
```


## API Integration

The application interacts with the following endpoints:

- `POST /application/create` - Submit new survey response
- `GET /application/all` - Fetch all submissions

## Form Validation Rules

- **Email**: Valid email format
- **Phone**: 10-15 digits with optional country code
- **ZIP Code**: 5 digits with optional 4-digit extension
- **Date of Birth**: Must be in the past
- **Required Fields**: All fields are mandatory unless specified

## Styling

- Custom primary color: #7755CC
- Font family: Fredoka
- Responsive design breakpoints
- Consistent spacing and typography

## Future Improvements

- Form data persistence using localStorage
- Direct URL access to specific form steps
- Export functionality (CSV/PDF)
- Sorting and filtering in applications list
- Enhanced accessibility
- Unit and integration tests
- Data caching
- Enhanced mobile responsiveness

