import { useState } from "react";
import { X, Twitter, MessageCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

interface UserProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { twitter: string; telegram: string }) => void;
  walletAddress: string;
}

const formSchema = z.object({
  twitter: z.string().min(1, "X username is required").startsWith('@', "X username must start with @"),
  telegram: z.string().min(1, "Telegram username is required").startsWith('@', "Telegram username must start with @"),
});

export const UserProfileModal = ({ isOpen, onClose, onSubmit, walletAddress }: UserProfileModalProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      twitter: "",
      telegram: "",
    },
  });

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    try {
      await onSubmit({
        twitter: values.twitter,
        telegram: values.telegram,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent 
        className="max-w-md bg-black/95 border-2 border-cyan-500/30 backdrop-blur-xl text-white"
        hideCloseButton={true}
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-20 p-2 rounded-full bg-black/40 hover:bg-cyan-500/20 border border-cyan-500/30 hover:border-cyan-400/60 transition-all duration-200 flex items-center justify-center group"
        >
          <X className="w-5 h-5 text-cyan-400 group-hover:text-cyan-300 transition-colors" />
        </button>

        <DialogTitle className="text-xl font-bold text-center text-cyan-300 mb-6">
          Complete Your Profile
        </DialogTitle>

        <div className="space-y-6">
          <div className="bg-cyan-900/20 border border-cyan-500/30 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-cyan-300 mb-2">Join Our Community</h3>
            <p className="text-sm text-gray-300 mb-4">
              To get access to the Autonoma platform, please:
            </p>
            <ol className="list-decimal pl-5 space-y-2 text-sm text-gray-300">
              <li>Follow us on X (Twitter) <a href="https://twitter.com/autonoma_ai" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline">@autonoma_ai</a></li>
              <li>Join our Telegram group <a href="https://t.me/autonoma_community" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline">t.me/autonoma_community</a></li>
              <li>Enter your handles below so we can verify your membership</li>
            </ol>
          </div>

          <div className="font-mono text-xs p-3 bg-gray-800/50 rounded-md border border-gray-700">
            <p className="text-gray-400">Connected wallet: <span className="text-cyan-400">{walletAddress.substring(0, 6)}...{walletAddress.substring(walletAddress.length - 4)}</span></p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="twitter"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-300 flex items-center gap-2">
                      <Twitter className="w-4 h-4 text-blue-400" /> X (Twitter) Username
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="@yourusername"
                        className="bg-gray-800/50 border-gray-700 text-gray-100"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription className="text-gray-500 text-xs">
                      Your X username that you'll use to follow us
                    </FormDescription>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="telegram"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-300 flex items-center gap-2">
                      <MessageCircle className="w-4 h-4 text-cyan-400" /> Telegram Username
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="@yourusername"
                        className="bg-gray-800/50 border-gray-700 text-gray-100"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription className="text-gray-500 text-xs">
                      Your Telegram username you'll use to join our group
                    </FormDescription>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                variant="default"
                className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Submitting...
                  </div>
                ) : (
                  "Submit & Verify Membership"
                )}
              </Button>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};
