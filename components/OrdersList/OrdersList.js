import React, { Component } from "react";
import PropTypes from "prop-types";
import { map, extend } from "lodash";
import { Modal, ModalBody } from "react-modal-bootstrap";
import Pagination from "react-js-pagination";
import Scroll from "react-scroll";

import MapContainer from "../shared/MapContainer";
import Preloader from "../shared/Preloader";
import * as modalTypes from "../../helpers/modalTypes";

class OrdersList extends Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
    orders: PropTypes.object.isRequired,
    isLoading: PropTypes.bool.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      ordersList: null,
      openModalName: "",
      currentOrder: "",
      page: 1
    };
  }

  componentWillMount() {
    const { filter } = this.props.orders;
    this.props.fetchOrdersList(filter);
  }

  componentWillReceiveProps(nextProps) {
    Scroll.animateScroll.scrollToTop();

    if (nextProps.location.key !== this.props.location.key)
      this.props.fetchOrdersList(this.props.orders.filter);

    if (nextProps.orders.ordersList) {
      this.setState({
        ordersList: nextProps.orders.ordersList,
        page: nextProps.orders.pagination.page
      });
    }
  }

  componentWillUnmount = () => {
    this.props.clearOrdersList();
  };

  hideModal = () => {
    this.setState({
      openModalName: ""
    });
  };

  openModal = (type, order) => {
    this.setState({
      openModalName: type,
      currentOrder: order
    });
  };

  updateOrders = newOrders => {
    this.setState({
      ordersList: newOrders
    });
  };

  handlePageChange = page => {
    const { filter } = this.props.orders;
    this.props.fetchOrdersList(extend(filter, { page }));
  };

  render() {
    const { ordersList } = this.state;
    const { isLoading } = this.props;
    const { pagination } = this.props.orders;

    return (
      <div className="content">
        <div className="container">
          {isLoading && <Preloader />}

          {pagination && (
            <div>
              <i className="fa fa-rss" />
              <span>{pagination.total_count} Orders Found</span>
            </div>
          )}

          {ordersList && (
            <div>
              {!ordersList.length && (
                <p className="empty-list">
                  There are no listings that match your search criteria at the
                  moment.
                </p>
              )}

              <ul className="list-notstyled">
                {map(ordersList, order => (
                  <div className="order" key={order.id}>
                    <div className="order-title">
                      <Link to={`/order/${order.id}`} className="order-heading">
                        {order.title}
                      </Link>
                    </div>
                    <div className="order-descr">{order.description}</div>
                  </div>
                ))}
              </ul>

              {pagination &&
                pagination.total_pages > 1 && (
                  <div className="fw-pagination">
                    <Pagination
                      activePage={this.state.page}
                      itemsCountPerPage={pagination.per_page}
                      totalItemsCount={pagination.total_count}
                      pageRangeDisplayed={5}
                      onChange={this.handlePageChange}
                    />
                  </div>
                )}

              {this.state.currentOrder && (
                <Modal
                  isOpen={this.state.openModalName === modalTypes.MODAL_MAP}
                  onRequestHide={this.hideModal}
                  className="fw-modal-maps"
                >
                  <ModalBody>
                    {this.state.openModalName === modalTypes.MODAL_MAP && (
                      <MapContainer
                        order={this.state.currentOrder}
                        onClose={this.hideModal}
                      />
                    )}
                  </ModalBody>
                </Modal>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }
}
export default OrdersList;
