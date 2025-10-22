import { useEffect } from 'react';
import { CheckCircle, XCircle } from 'lucide-react';

const Toast = ({ message, type, onDone }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onDone();
        }, 3000); // The toast will disappear after 3 seconds

        return () => clearTimeout(timer);
    }, [onDone]);

    const isSuccess = type === 'success';
    const Icon = isSuccess ? CheckCircle : XCircle;

    return (
        <div className={`toast ${isSuccess ? 'toast-success' : 'toast-error'}`}>
            <Icon size={20} className="toast-icon" />
            <span>{message}</span>
        </div>
    );
};

export default Toast;
