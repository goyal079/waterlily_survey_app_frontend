import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { FormProvider } from './context/FormContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SurveyForm from './components/SurveyForm';
import ReviewSubmission from './components/ReviewSubmission';
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <FormProvider>
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-center mb-8">
            Survey App
          </h1>
          <Routes>
            <Route path="/" element={<Navigate to="/survey" replace />} />
            <Route path="/survey" element={<SurveyForm />} />
            <Route path="/review" element={<ReviewSubmission />} />
          </Routes>
        </div>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </FormProvider>
    </BrowserRouter>
  )
}

export default App
