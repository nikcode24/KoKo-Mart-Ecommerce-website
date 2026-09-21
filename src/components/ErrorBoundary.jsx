import { Component } from 'react'

export default class ErrorBoundary extends Component {
  state = { hasError: false, message: '' }

  static getDerivedStateFromError(error) {
    return { hasError: true, message: error?.message || 'Unexpected error' }
  }

  componentDidCatch(error, info) {
    console.error('ErrorBoundary caught:', error, info)
  }

  handleReset = () => {
    this.setState({ hasError: false, message: '' })
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="state-block" role="alert" style={{ minHeight: '60vh', borderRadius: 0 }}>
          <p className="state-block__title">Something went wrong</p>
          <p className="state-block__text">{this.state.message}</p>
          <button type="button" className="btn btn-primary" onClick={this.handleReset}>
            Reload app
          </button>
        </div>
      )
    }
    return this.props.children
  }
}