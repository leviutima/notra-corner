import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  forgotPasswordFormSchema,
  ForgotPasswordFormSchema,
} from "../schemas/forgot-password-schema";
import { useMutation } from "@tanstack/react-query";
import { forgotPassword } from "@/service/auth/forgot-password";
import { toast } from "sonner";

export function useForgotPassword() {
  const form = useForm<ForgotPasswordFormSchema>({
    resolver: zodResolver(forgotPasswordFormSchema),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (data: ForgotPasswordFormSchema) => forgotPassword(data),
    mutationKey: ["user"],
    onSuccess: () => {
      toast.success("Email enviado com sucesso");
    },
    onError: () => {
      toast.error("Erro ao enviar email, tente novamente");
    },
  });

  const onSubmit = (data: ForgotPasswordFormSchema) => {
    mutate(data);
  };

  return { form, onSubmit, isPending };
}
