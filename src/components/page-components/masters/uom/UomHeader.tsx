
"use client";
import { Modal } from "@/components/modal";
import Button from "@/components/ui/button/Button";
import { useModal } from "@/hooks/useModal";
import UOMForm from "./UomForm";

export default function UOMHeader() {
     const { isOpen, openModal, closeModal } = useModal();
     
  return (
    <div className="flex flex-col lg:flex-row gap-2 lg:gap-0 items-start justify-between lg:items-center w-full my-5">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90 text-start">UOM Master</h3>
      <div className="flex justify-between items-center gap-3 flex-wrap-reverse">
        <div className="flex gap-2">
          <Button onClick={() => openModal()} size="sm" variant="primary">
            Add +
          </Button>
        </div>
      </div>
      <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[700px] p-6 lg:p-10">
        <UOMForm onClose={closeModal} />
      </Modal>
    </div>
  );
}