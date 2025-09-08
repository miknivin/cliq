interface FormSectionProps {
  title: string;
  children: React.ReactNode;
}

const FormSection: React.FC<FormSectionProps> = ({ title, children }) => (
  <div className="rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03] p-3">
    <h2 className="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-300">{title}</h2>
    <div className="grid grid-cols-2 gap-4">{children}</div>
  </div>
);

export default FormSection;