import { v4 } from 'uuid';
/* istanbul ignore next */
export default (): string => v4().replaceAll('-', '');
