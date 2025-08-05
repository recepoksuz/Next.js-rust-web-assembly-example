interface ErrorMessageProps {
  error: string;
  description?: string;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({
  error,
  description = "Check the browser console for more details",
}) => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="text-center">
      <p className="text-red-600 text-lg mb-4">{error}</p>
      <p className="text-gray-600">{description}</p>
    </div>
  </div>
);
