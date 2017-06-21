import React, {PureComponent} from 'react';

class PrintIcon extends PureComponent {
  render() {
    return (
      <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M8 17h7v-2H8v2zm0-5h7V9h-1.25a.75.75 0 0 1-.75-.75V7H8v5zm9 .5c0-.273-.227-.5-.5-.5s-.5.227-.5.5.227.5.5.5.5-.227.5-.5zm1 0v3.25c0 .133-.117.25-.25.25H16v1.25a.75.75 0 0 1-.75.75h-7.5a.75.75 0 0 1-.75-.75V16H5.25a.257.257 0 0 1-.25-.25V12.5c0-.82.68-1.5 1.5-1.5H7V6.75A.75.75 0 0 1 7.75 6H13c.414 0 .984.234 1.281.531L15.47 7.72c.297.297.531.867.531 1.281v2h.5c.82 0 1.5.68 1.5 1.5z"
          fillRule="evenodd"/>
      </svg>
    );
  }
}

export default PrintIcon;
