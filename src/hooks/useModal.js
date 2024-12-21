import { useState } from "react";

export function usesModal() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    function handleModalOpen() {
        setIsModalOpen(true);
    }

    function handleModalClose() {
        setIsModalOpen(false);
    }
    return {
        isModalOpen,
        handleModalOpen,
        handleModalClose
    }
}