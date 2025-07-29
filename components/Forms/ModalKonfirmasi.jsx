"use client";

import { Dialog } from "@headlessui/react";

export default function ModalKonfirmasi({
  isOpen,
  onClose,
  onConfirm,
  title = "Yakin ingin menghapus?",
}) {
  return (
    <Dialog open={isOpen} onClose={onClose} className="fixed z-50 inset-0">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

      <div className="flex items-center justify-center min-h-screen">
        <Dialog.Panel className="bg-white p-6 rounded-xl shadow-xl z-50 max-w-sm w-full mx-auto">
          <Dialog.Title className="text-lg font-semibold mb-4 text-black text-center">
            {title}
          </Dialog.Title>

          <div className="flex justify-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-gray-200 text-gray-800 hover:bg-gray-300"
            >
              Batal
            </button>
            <button
              onClick={() => {
                onConfirm();
                onClose();
              }}
              className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700"
            >
              Hapus
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}