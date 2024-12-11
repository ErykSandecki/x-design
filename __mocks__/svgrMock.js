import React from 'react';
const SvgrMock = React.forwardRef((props, ref) => <div ref={ref} {...props} />);
export const ReactComponent = SvgrMock;
export default SvgrMock;
