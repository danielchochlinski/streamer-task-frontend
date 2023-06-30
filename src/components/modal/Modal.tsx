import React from "react";
import Modal from "@mui/joy/Modal";
import ModalClose from "@mui/joy/ModalClose";
import Sheet from "@mui/joy/Sheet";

interface IModal {
  children: any;
  openModal: boolean;
  setOpenModal: (status: boolean) => void;
}
export default function BasicModal({
  children,
  openModal,
  setOpenModal,
}: IModal) {
  return (
    <Modal
      aria-labelledby="global modal"
      aria-describedby="universal modal"
      open={openModal}
      onClose={() => setOpenModal(false)}
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <Sheet
        variant="outlined"
        sx={{
          maxWidth: 500,
          borderRadius: "md",
          p: 3,
          boxShadow: "lg",
        }}
      >
        <ModalClose
          variant="outlined"
          sx={{
            top: "calc(-1/4 * var(--IconButton-size))",
            right: "calc(-1/4 * var(--IconButton-size))",
            boxShadow: "0 2px 12px 0 rgba(0 0 0 / 0.2)",
            borderRadius: "50%",
            bgcolor: "background.body",
          }}
        />
        {children}
      </Sheet>
    </Modal>
  );
}
