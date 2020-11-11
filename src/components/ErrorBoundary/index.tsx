import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props: any) {
    super(props);
    this.state = {
      hasError: false
    };
  }
  componentWillMount() {
    window.addEventListener('error', (event:any) => {
      const err = event.reason.toString();
      console.log(err)
    }, true);
    window.addEventListener('unhandledrejection', (event:any) => {
      const err = event.reason.toString();
      console.log(err);
    })
  }
  componentDidCatch(error: any, info: any) {
    const err = error.toString();
    console.log(err);
    this.setState({ hasError: true });
    // logErrorToMyService(error,info);
  }

  render() {
    // @ts-ignore
    const { children } = this.props;
    // @ts-ignore
    const props = children.props;
    // @ts-ignore
    const newChildren = React.cloneElement(children, {
      ...props,
      ...this.props
    });

    return (
      <div className="error-boundary">
        { newChildren }
      </div>
    );
  }
}

export default ErrorBoundary;
