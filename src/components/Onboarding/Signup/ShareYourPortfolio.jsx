// images or icons
import Copy from "@/assets/copy_white.svg";

// hooks
import axios from "axios";
import { api } from "@/api";
import { useState } from "react";
import { useNavigate } from "react-router";
import { BASE_URL_CLIENT } from "@/config";

// components
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Spinner } from "@/components/ui/spinner";

const ShareYourPortfolio = ({
  dialogOpen,
  setDialogOpen,
  formData,
  setFormData,
}) => {
  // hooks
  const navigate = useNavigate();

  // states
  const [loading, setLoading] = useState(false);

  // functions
  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    try {
      await api.put("/api/review", {
        reviewId: formData.reviewId,
        accessType: formData.accessType,
      });
      await navigator.clipboard.writeText(
        `${BASE_URL_CLIENT}/review/${formData.reviewAccessToken}`,
      );
      toast.success("Link copied to clipboard");
      navigate("/dashboard");
    } catch (err) {
      console.log("Access type updating failed", err);
      if (axios.isAxiosError(err)) {
        const message =
          err.response?.data?.message || "Access type updating failed";
        toast.error(message);
      } else {
        toast.error("Unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <form onSubmit={handleSubmit}>
        <DialogContent className="w-100 flex flex-col gap-5">
          <DialogHeader>
            <DialogTitle className="text-lg text-black">
              Sharing your portfolio
            </DialogTitle>
            <DialogDescription className="text-xs text-secondary">
              You can send this link to the person that will give you feedback
              on your portfolio/website.
            </DialogDescription>
          </DialogHeader>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="w-full flex flex-col gap-5">
                <div className="flex w-full gap-2">
                  <Input
                    id="emailInvites"
                    type="text"
                    placeholder="Add comma separated emails to invite"
                    className="text-black text-sm placeholder:text-xs"
                    // value={goals}
                    // onChange={handleChange}
                    disabled
                  />
                  <Button
                    className="bg-secondary text-white cursor-pointer font-normal"
                    type="button"
                    disabled
                  >
                    Invite
                  </Button>
                </div>
                <div className="flex flex-col w-full gap-2">
                  <h1 className="text-xxs text-secondary">WHO HAS ACCESS</h1>
                  <span className="w-full flex justify-between items-center">
                    <h1 className="text-sm text-black">Anyone with link</h1>
                    <Select
                      value={formData.accessType}
                      onValueChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          accessType: e,
                        }))
                      }
                    >
                      <SelectTrigger className="w-30 h-8!">
                        <SelectValue placeholder="view" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Type</SelectLabel>
                          <SelectItem value="view">can view</SelectItem>
                          <SelectItem value="edit">can edit</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </span>
                  <span className="w-full flex justify-between items-center">
                    <h1 className="text-sm text-black">{`${formData.name} (you)`}</h1>
                    <h1 className="text-sm text-black">Owner</h1>
                  </span>
                </div>
              </div>
            </TooltipTrigger>

            <TooltipContent className="bg-black w-full h-full">
              <p className="text-white">Coming soon</p>
            </TooltipContent>
          </Tooltip>

          <DialogFooter>
            <Button
              type="submit"
              className="w-full rounded-full flex justify-between py-5 cursor-pointer"
              onClick={handleSubmit}
            >
              Copy link & go to dashboard
              <img src={Copy} alt="Copy" className="w-4 h-4" />
            </Button>
          </DialogFooter>
          {loading && (
            <Spinner className="w-4 h-4 text-black ml-auto mr-auto" />
          )}
        </DialogContent>
      </form>
    </Dialog>
  );
};

export default ShareYourPortfolio;
