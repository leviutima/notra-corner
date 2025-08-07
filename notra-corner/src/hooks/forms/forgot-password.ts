import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  forgotPasswordFormSchema,
  ForgotPasswordFormSchema,
} from "../schemas/forgot-password-schema";
import { useMutation } from "@tanstack/react-query";
import { forgotPassword } from "@/service/auth/forgot-password";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useVerificationCode } from "@/context/useVerificationCodeDatas";

export function useForgotPassword() {
  const router = useRouter();
  const { setUserIdCode, setEmailCode } = useVerificationCode();
  const form = useForm<ForgotPasswordFormSchema>({
    resolver: zodResolver(forgotPasswordFormSchema),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (data: ForgotPasswordFormSchema) => forgotPassword(data),
    mutationKey: ["user"],
    onSuccess: (response) => {
      console.log(response);
      toast.success("Email enviado com sucesso");
      if (response) {
        router.push(`/auth/enter-code`);
        setUserIdCode(response.user);
      }
    },
    onError: () => {
      toast.error("Erro ao enviar email, tente novamente");
    },
  });

  const onSubmit = (data: ForgotPasswordFormSchema) => {
    mutate(data);
    setEmailCode(data);
  };

  return { form, onSubmit, isPending };
}
