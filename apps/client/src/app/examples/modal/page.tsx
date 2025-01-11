"use client"

import { Button } from "@/components/ui/button"
import {
  Modal,
  ModalContent,
  ModalDescription,
  ModalFooter,
  ModalHeader,
  ModalTitle,
  ModalTrigger,
} from "@/components/ui/modal"

export default function ModalExample() {
  return (
    <div className="p-8">
      <Modal>
        <ModalTrigger asChild>
          <Button variant="outline">Open Modal</Button>
        </ModalTrigger>
        <ModalContent>
          <ModalHeader>
            <ModalTitle>Example Modal</ModalTitle>
            <ModalDescription>
              This is an example modal dialog. You can close it by clicking the X button
              or clicking outside the modal.
            </ModalDescription>
          </ModalHeader>
          <div className="py-4">
            <p>Modal content goes here. You can add any content you want.</p>
          </div>
          <ModalFooter>
            <Button variant="outline">Cancel</Button>
            <Button>Continue</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  )
} 