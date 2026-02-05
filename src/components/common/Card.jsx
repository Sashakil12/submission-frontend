import { motion } from 'framer-motion';

const Card = ({
  children,
  className = '',
  hover = false,
  padding = true,
  onClick,
}) => {
  const baseStyles = 'bg-white rounded-2xl border border-gray-100 shadow-soft';
  const hoverStyles = hover ? 'hover:shadow-medium hover:border-gray-200 hover:-translate-y-1 cursor-pointer transition-all duration-300' : '';
  const paddingStyles = padding ? 'p-6' : '';

  if (onClick) {
    return (
      <motion.div
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
        onClick={onClick}
        className={`${baseStyles} ${hoverStyles} ${paddingStyles} ${className}`}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`${baseStyles} ${paddingStyles} ${className}`}
    >
      {children}
    </motion.div>
  );
};

export default Card;
