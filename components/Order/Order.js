import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import classnames from "classnames";
import { map, join } from "lodash";

import { isCompleteProfile } from "../../helpers/ProfileHelper";
import { getDate } from "../../helpers/TabHelper";
import { renderDistance } from "../../helpers/DistanceHelper";
import * as modalTypes from "../../helpers/modalTypes";
import Preloader from "../shared/Preloader";

class Order extends Component {
  static propTypes = {
    orderId: PropTypes.number.isRequired,
    user: PropTypes.object.isRequired,
    order: PropTypes.object,
    isLoading: PropTypes.bool.isRequired
  };

  componentWillMount = () => {
    const { fetchOrder, orderId } = this.props;
    fetchOrder(orderId);
  };

  componentWillUnmount = () => {
    this.props.clearOrder();
  };

  getBidButton = () => {
    const { user, order } = this.props;

    const isCompleteProfile = isCompleteProfile(user.profile);
    return (
      <div className="fw-tab-list-helper">
        <Link
          to={`/order/${order.id}`}
          className={classnames("btn btn-success", {
            disabled: !isCompleteProfile
          })}
        >
          Bid ({order.bids_count})
        </Link>
      </div>
    );
  };

  isBadCoords = order => {
    return order.address.lat === null || order.address.lon === null;
  };

  render() {
    const { order, isLoading } = this.props;

    return (
      <div>
        {isLoading && <Preloader />}

        {order && (
          <li className="order">
            <div className="order-descr">
              <Link to={`/order/${order.id}`} className="order-heading">
                {order.title}
              </Link>

              <div className="order-addit">
                <span className="order-key">Wood:</span>
                <span className="order-value">
                  {join(map(order.woods, wood => wood.title), ", ")}
                </span>
              </div>
              <div className="order-addit">
                <span className="order-key">Cords:</span>
                <span className="order-value">{order.cords_number}</span>
              </div>
              <div className="order-addit">
                <span className="order-key">Distance:</span>
                <span className="order-value">
                  {renderDistance(order.distance_in_meters)}
                </span>

                {!this.isBadCoords(order) && (
                  <button
                    className="order-map"
                    onClick={() =>
                      this.props.openModal(modalTypes.MODAL_MAP, order)
                    }
                  />
                )}
              </div>
              <div className="order-addit">
                <span className="order-key">Location:</span>
                <span className="order-value">
                  {order.address.city}, {order.address.state}
                </span>
              </div>
              <div className="order-addit">
                <span className="order-key">Date:</span>
                <span className="order-value">
                  {getDate(order.delivery_at)}
                </span>
              </div>
            </div>

            {this.getBidButton()}

            <div className="order-text">{order.description}</div>
          </li>
        )}
      </div>
    );
  }
}

export default Order;
