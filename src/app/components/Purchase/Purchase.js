import React from "react";
import "./../../styles/styles.scss";
import "../App/App.scss";
import "./Purchase.scss";

const Purchase = (props) => {
	return (
		<div className="card-container w-65">
			<div className="card">
				<div className="card-prop">
					<label>Nombre de la compra</label>
					<span>{props.item_name}</span>
				</div>
				<div className="card-prop">
					<label>Nombre del comercio</label>
					<span>{props.store_name}</span>
				</div>
				<div className="card-prop">
					<label>Fecha de compra</label>
					<span>{props.purchasing_date}</span>
				</div>
				<div className="card-prop">
					<label>Precio final</label>
					<span className="price">${props.total_amount}</span>
				</div>
				{props.active_quota !== undefined &&
					props.total_quotas !== undefined && (
						<div className="card-prop">
							<label>Cuota a pagar</label>
							<span className="price">
								{props.active_quota}/{props.total_quotas}
							</span>
						</div>
					)}
				{props.quota_amount !== undefined && (
					<div className="card-prop">
						<label>Valor cuota</label>
						<span className="price">${props.quota_amount}</span>
					</div>
				)}
				<div className="card-prop">
					<label>Tarjeta adquirente</label>
					<span>{props.bank}</span>
				</div>
				<div className="card-prop">
					<label>Banco emisor</label>
					<span>{props.card}</span>
				</div>
			</div>
			<button
				className="button delete-button"
				title="Delete purchase"
				onClick={props.onDeleteClick}
			>
				-
			</button>
		</div>
	);
};

export default Purchase;
