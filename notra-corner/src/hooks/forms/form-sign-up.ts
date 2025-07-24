import { createUser } from "@/service/user/create-user";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import z from "zod";

const signUpFormSchema = z.object({
  name: z.string().nonempty("Nome é obrigatório"),
  surname: z.string().nonempty("Sobrenome é obrigatório"),
  email: z
    .string()
    .email("Insira um email válido")
    .nonempty("Email é obrigatório"),
  birthDate: z.string().nonempty("Data de nascimento é obrigatório"),
  password: z
    .string()
    .nonempty("Senha é obrigatório")
    .min(6, "No mínimo 6 caractéres"),
});

type SignUpFormSchema = z.infer<typeof signUpFormSchema>;
export function useSignUp() {
  const router = useRouter();
  const formSignUp = useForm<SignUpFormSchema>({
    resolver: zodResolver(signUpFormSchema),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: SignUpFormSchema) => createUser(data),
    mutationKey: ["user"],
  });

  const onSubmit = async (data: SignUpFormSchema) => {
    mutate(data);
    router.push("/auth/sign-in");
  };

  return { formSignUp, isPending, onSubmit };
}
