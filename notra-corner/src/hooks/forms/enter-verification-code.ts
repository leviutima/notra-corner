import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  VerificationCodeFormSchema,
  verificationCodeFormShcema,
} from "../schemas/verification-code-schema";
import { useMutation } from "@tanstack/react-query";
import { enterCode } from "@/service/auth/enter-code";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useVerificationCode } from "@/context/useVerificationCodeDatas";

export function UseEnterVerificationCode() {
  const router = useRouter();
  const { userIdCode } = useVerificationCode();
  const form = useForm<VerificationCodeFormSchema>({
    resolver: zodResolver(verificationCodeFormShcema),
    defaultValues: {
      userId: userIdCode,
      code: "",
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (data: VerificationCodeFormSchema) => enterCode(data),
    mutationKey: ["user"],
    onSuccess: (response) => {
      console.log(response);
      if (response.token) {
        router.push(`/auth/update-password`);
      }
    },
    onError: () => {
      toast.error("Código inválido, tente novamente");
    },
  });

  const onSubmit = async (data: VerificationCodeFormSchema) => {
    mutate(data);
  };

  return { isPending, form, onSubmit };
}
