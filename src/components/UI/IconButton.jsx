import { memo } from 'react';
import { log } from '../../log.js';

/**
 * Even if we add memo, IconButton component is re-rendered. 
 * The reason is that some props are changing. In our case '...props'.
 * To fix it, we need to add useCallback to the onClick prop in Counter component.
 */
const IconButton = memo(function IconButton({ children, icon, ...props }) {
  log('<IconButton /> rendered', 2);

  const Icon = icon;
  return (
    <button {...props} className="button">
      <Icon className="button-icon" />
      <span className="button-text">{children}</span>
    </button>
  );
});

export default IconButton;