import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  updatePasswordUserFormSchema,
  UpdatePasswordUserFormSchema,
} from "../schemas/update-password-user-schema";
import { useMutation } from "@tanstack/react-query";
import { updatePassword } from "@/service/auth/update-password";
import { useVerificationCode } from "@/context/useVerificationCodeDatas";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export function UseUpdatePassword() {
  const router = useRouter();
  const { userIdCode } = useVerificationCode();
  const form = useForm<UpdatePasswordUserFormSchema>({
    resolver: zodResolver(updatePasswordUserFormSchema),
    defaultValues: {
      userId: userIdCode,
      password: "",
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (data: UpdatePasswordUserFormSchema) => updatePassword(data),
    mutationKey: ["user"],
    onSuccess: () => {
      router.push(`/auth/sign-in`)
    },
    onError: () => {
      toast.error("Erro ao atualizar senha, tente novamente")
    }
  });

  const onSubmit = async (data: UpdatePasswordUserFormSchema) => {
    console.log("dados:", data);
    
    mutate(data);
  };

  return { onSubmit, form, isPending };
}
