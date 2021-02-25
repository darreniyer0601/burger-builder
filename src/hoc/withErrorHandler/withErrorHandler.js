import React from 'react';

import Modal from '../../components/UI/Modal/Modal';
import Auxilliary from '../Auxilliary/Auxilliary';

const withErrorHandler = (WrappedComponent, axios) => {
    return class extends React.Component {
        state = {
            error: null
        }

        componentDidMount() {
            this.requestInterceptor = axios.interceptors.request.use(req => {
                this.setState({ error: null });
                return req;
            })

            this.responseInterceptor = axios.interceptors.response.use(res => res, err => {
                this.setState({ error: err })
            })
        }

        componentWillUnmount() {
            axios.interceptors.request.eject(this.requestInterceptor);
            axios.interceptors.response.eject(this.responseInterceptor);
        }

        errorConfirmedHandler = () => {
            this.setState({ error: null });
        }


        render() {
            return (
                <Auxilliary>
                    <Modal
                        show={this.state.error}
                        modalClosed={this.errorConfirmedHandler} >
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props} />
                </Auxilliary>
            );
        }
    }
};

export default withErrorHandler;