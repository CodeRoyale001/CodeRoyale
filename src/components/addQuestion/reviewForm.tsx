import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface FinalFormProps {
  handleFormSubmision: () => void;
}

const FinalForm: React.FC<FinalFormProps> = ({ handleFormSubmision }) => {
  const [agreed, setAgreed] = useState(false);
  const [open, setOpen] = useState(false);

  const handleSubmit = () => {
    if (!agreed) {
      return;
    }
    setOpen(true);
    
  };

  const handleConfirm = () => {
    setOpen(false);
    handleFormSubmision();
  };

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-center font-bold text-5xl text-primary dark:text-primary my-6">
        Review and Submit
      </h1>
      <div className="hidden sm:block sm:w-[650px] lg:w-[850px] bg-white border-2 mb-5 border-black/15 dark:bg-background dark:border-white/15 rounded-lg shadow-xl p-8">
        <h2 className="text-xl font-semibold mb-4">Terms and Conditions</h2>
        <div className="overflow-y-auto max-h-100 p-4 border rounded-md bg-background">
          <p className="text-sm text-foreground">
            By submitting this form, you agree to the following terms and
            conditions:
            <br />
            <br />
            1. <strong>Accuracy of Information</strong>: You certify that the
            information provided is true and accurate to the best of your
            knowledge.
            <br />
            <br />
            2. <strong>Originality of Content</strong>: All content submitted is
            your original work and does not infringe upon the intellectual
            property rights of others.
            <br />
            <br />
            3. <strong>Compliance with Guidelines</strong>: Your submission
            complies with all applicable laws and our community guidelines.
            <br />
            <br />
            4. <strong>License Grant</strong>: You grant us a non-exclusive,
            worldwide, royalty-free license to use, reproduce, and distribute
            your submitted content.
            <br />
            <br />
            5. <strong>Limitation of Liability</strong>: You agree that we are
            not liable for any indirect, incidental, or consequential damages
            arising from your submission.
            <br />
            <br />
            Please read these terms carefully before proceeding.
          </p>
        </div>
        <div className="flex items-center mt-4">
          <Checkbox
            id="agree"
            checked={agreed}
            onCheckedChange={(checked) => setAgreed(Boolean(checked))}
          />
          <label htmlFor="agree" className="ml-2 text-sm text-foreground">
            I have read and agree to the terms and conditions
          </label>
        </div>
        <div className="flex justify-end mt-6">
          <Button
            type="button"
            onClick={handleSubmit}
            disabled={!agreed}
            className={!agreed ? "opacity-50 cursor-not-allowed" : ""}
          >
            Submit
          </Button>
        </div>
      </div>

      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Submission</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to submit? You won't be able to make any
              changes after this.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setOpen(false)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirm}>
              Confirm
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default FinalForm;
