import React from 'react';

// getComponent is a function that returns a promise for a component
// It will not be called until the first mount
export default function asyncComponent(getComponent) {
  return class AsyncComponent extends React.Component {
    static Component = null;
    state = { Component: AsyncComponent.Component };

    componentWillMount() {
      if (!this.state.Component) {
        getComponent().then(Component => {
          AsyncComponent.Component = Component;
          this.setState({ Component });
        });
      }
      /*
      this.props.history.listen(location => {
        if (location.pathname !== this.props.location.pathname) {
          this.props.location.pathname = location.pathname;
          this.forceUpdate();
        }
      });*/
    }
    render() {
      const { Component } = this.state;
      if (Component) {
        return <Component.default {...this.props} />;
      }
      return null;
    }
  };
}
