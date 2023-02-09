import React from "react";
import styled from "styled-components";
import { ToastContainer, cssTransition, toast } from "react-toastify";
import "./Toast.scss";
import Fail from "./icons-fail-48-px.svg";
import Success from "./icons-checkbox-success-white-36-px.svg";
import Info from "./icons-info-48-px.svg";
import Warning from "./icons-warning-48-px.svg";

const ToastBody = styled.div`
	display: flex;
	align-items: center;
	padding: 12px 10px;
	width: 360px;
`;

const ToastImg = styled.img`
	margin-right: 10px;
	width: 36px;
	height: 36px;
`;

const Fade = cssTransition({
	enter: "Toastify__fade-enter",
	exit: "Toastify__fade-exit",
});

const InProgressToast = ({ message, secondMessage }) => {
	return (
		<ToastBody className="toast-styles">
			<ToastImg src={Info} alt="Info" />
			<div>
				<span
				// variant="white"
				// align={"left"}
				// type={"3"}
				// weight={"regular"}
				>
					{message}
				</span>
				<span
				// variant="white"
				// align={"left"}
				// type={"3"}
				// weight={"regular"}
				>
					{secondMessage}
				</span>
			</div>
		</ToastBody>
	);
};

const SuccessToast = ({ message, secondMessage }) => {
	return (
		<ToastBody className="toast-styles">
			<ToastImg src={Success} alt="Success" />
			<div>
				<span
				// variant="white"
				// align={"left"}
				// type={"3"}
				// weight={"regular"}
				>
					{message}
				</span>
				<span
				// variant="white"
				// align={"left"}
				// type={"3"}
				// weight={"regular"}
				>
					{secondMessage}
				</span>
			</div>
		</ToastBody>
	);
};

const ErrorToast = ({ message, secondMessage }) => {
	return (
		<ToastBody className="toast-styles">
			<ToastImg src={Fail} alt="Fail" />
			<div>
				<span
				// variant="white"
				// align={"left"}
				// type={"3"}
				// weight={"regular"}
				>
					{message}
				</span>
				<span
				// variant="white"
				// align={"left"}
				// type={"3"}
				// weight={"regular"}
				>
					{secondMessage}
				</span>
			</div>
		</ToastBody>
	);
};

const WarningToast = ({ message, secondMessage }) => {
	return (
		<ToastBody className="toast-styles">
			<ToastImg src={Warning} alt="Warning" />
			<div>
				<span
				// variant="white"
				// align={"left"}
				// type={"3"}
				// weight={"regular"}
				>
					{message}
				</span>
				<span
				// variant="white"
				// align={"left"}
				// type={"3"}
				// weight={"regular"}
				>
					{secondMessage}
				</span>
			</div>
		</ToastBody>
	);
};

const useToast = {
	error: (message, id, secondMessage) => {
		toast.error(
			<ErrorToast message={message} secondMessage={secondMessage} />,
			{ containerId: id }
		);
	},
	success: (message, id, secondMessage) => {
		toast.success(
			<SuccessToast message={message} secondMessage={secondMessage} />,
			{ containerId: id }
		);
	},
	inProgress: (message, id, secondMessage) => {
		toast.info(
			<InProgressToast message={message} secondMessage={secondMessage} />,
			{ containerId: id }
		);
	},
	warning: (message, id, secondMessage) => {
		toast.warning(
			<WarningToast message={message} secondMessage={secondMessage} />,
			{ containerId: id }
		);
	},
	dismiss: () => {
		toast.dismiss();
	},
};

const Toast = ({ position, autoClose, className, id, fullWidth }) => {
	return (
		<ToastContainer
			enableMultiContainer
			containerId={id}
			position="top-center"
			autoClose={autoClose}
			hideProgressBar
			newestOnTop
			closeOnClick={true}
			rtl={false}
			pauseOnFocusLoss={true}
			draggable={false}
			pauseOnHover={true}
			transition={Fade}
			className={`${className} ${
				fullWidth && "Toast__toast-body--md-full"
			}`}
			closeButton={false}
			limit={4}
		/>
	);
};

Toast.defaultProps = {
	position: "top-right",
	fullWidth: false,
	autoClose: 5000,
};

// Toast.propTypes = {
// 	position: PropTypes.oneOf([
// 		"top-left",
// 		"top-center",
// 		"top-right",
// 		"bottom-left",
// 		"bottom-center",
// 		"bottom-right",
// 	]),
// 	fullWidth: PropTypes.bool,
// 	className: PropTypes.string,
// 	id: PropTypes.string,
// };

export { Toast, useToast };
