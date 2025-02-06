import clsx from "clsx"
import React, {
  forwardRef,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react"
import { twMerge } from "tailwind-merge"

import { IComponentBaseProps } from "../types"

import ModalActions from "./ModalActions"
import ModalBody from "./ModalBody"
import ModalHeader from "./ModalHeader"
import ModalLegacy from "./ModalLegacy"

export type ModalProps = React.HTMLAttributes<HTMLDialogElement> &
  IComponentBaseProps & {
    open?: boolean
    responsive?: boolean
    backdrop?: boolean
    relativeRefId?: string
    onClose?: () => void
  }

const Modal = forwardRef<HTMLDialogElement, ModalProps>(
  (
    {
      children,
      open,
      responsive,
      backdrop,
      dataTheme,
      className,
      relativeRefId,
      onClose,
      ...props
    },
    ref,
  ): JSX.Element => {
    const containerClasses = twMerge(
      "modal",
      clsx({
        "modal-open": open,
        "modal-bottom sm:modal-middle": responsive,
      }),
    )

    const modalBoxRef = useRef<HTMLDivElement>(null)
    const [calculatedPosY, setCalculatedPosY] = useState(0)
    const [calculatedPosX, setCalculatedPosX] = useState(0)

    const SAFE_MARGIN = 10

    useEffect(() => {
      if (modalBoxRef?.current && relativeRefId) {
        const relativeRef = document.getElementById(relativeRefId)
        const offsetY = relativeRef?.offsetTop || 0
        const offsetX = relativeRef?.offsetLeft || 0
        const eventWidth = relativeRef?.offsetWidth || 0
        const eventHeight = relativeRef?.offsetHeight || 0
        const modalWidth = modalBoxRef.current.offsetWidth || 0
        const modalHeight = modalBoxRef.current.offsetHeight || 0
        if (offsetY && modalHeight) {
          // setCalculatedPosY(
          //   window.innerHeight - (offsetY + modalHeight + SAFE_MARGIN) < 0
          //     ? window.innerHeight / 2 - modalHeight / 2
          //     : window.innerHeight / 2 - modalHeight / 2
          // )
          setCalculatedPosY(window.innerHeight / 8)
        }
        if (offsetX && modalWidth) {
          const posX =
            window.innerWidth - offsetX < modalWidth + eventWidth + SAFE_MARGIN
              ? offsetX - modalWidth
              : offsetX + eventWidth
          setCalculatedPosX(
            posX < 0 ? window.innerWidth / 2 - modalWidth / 2 : posX,
          )
        }
      }
    }, [modalBoxRef?.current])

    // console.log("                   ")
    // console.log("window.innerWidth", window.innerWidth)
    // console.log("offset", offsetY)
    // console.log("boxWidth", modalWidth)
    // console.log("eventWidth", eventWidth)
    // console.log("eventHeight", eventHeight)
    // console.log("calculatedOffset", calculatedPosY)

    const bodyClasses = twMerge(
      "modal-box absolute p-[1.1rem] sm:p-[1.5rem]",
      className,
    )

    // useOutboundClick({
    //   refToWatchBeforeInit: ref as any,
    //   refToWatchAfterInit: modalBoxRef,
    //   onOuterClickSubcription: () => {
    //     ;(ref as any)?.current.close()
    //   },
    //   onInnerClickSubcription: () => {},
    // })

    return (
      <dialog
        {...props}
        aria-label="Modal"
        // aria-hidden={!open}
        open={open}
        aria-modal={open}
        data-theme={dataTheme}
        className={containerClasses}
        ref={ref}
        onClose={onClose}
      >
        <div
          data-theme={dataTheme}
          className={bodyClasses}
          ref={modalBoxRef}
          style={{
            top: calculatedPosY ? `${calculatedPosY}px` : undefined,
            left: calculatedPosX ? `${calculatedPosX}px` : undefined,
          }}
        >
          {children}
        </div>
        {backdrop && (
          <form method="dialog" className="modal-backdrop">
            <button>close</button>
          </form>
        )}
      </dialog>
    )
  },
)

Modal.displayName = "Modal"

export type DialogProps = Omit<ModalProps, "ref">
const useDialog = () => {
  const dialogRef = useRef<HTMLDialogElement>(null)

  const handleShow = useCallback(() => {
    dialogRef.current?.showModal()
  }, [dialogRef])

  const handleHide = useCallback(() => {
    dialogRef.current?.close()
  }, [dialogRef])

  const Dialog = ({ children, ...props }: DialogProps) => {
    return (
      <Modal {...props} ref={dialogRef}>
        {children}
      </Modal>
    )
  }
  Dialog.displayName = "Dialog"
  return { dialogRef, Dialog, handleShow, handleHide }
}
export default Object.assign(Modal, {
  Header: ModalHeader,
  Body: ModalBody,
  Actions: ModalActions,
  Legacy: ModalLegacy,
  useDialog,
})

export const CloseButtonModal = ({
  closeModal,
}: {
  closeModal: () => void
}) => (
  <div className="flex justify-end">
    {/* <form method="dialog"> */}
    <button
      className="btn btn-sm btn-circle absolute right-2 top-2"
      onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        closeModal()
      }}
    >
      ✕
    </button>
    {/* </form> */}
  </div>
)
