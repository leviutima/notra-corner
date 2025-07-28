import { loginRequest } from "@/store/auth/actions/action";
import { AppDispatch } from "@/store/store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import z from "zod";

const loginFormSchema = z.object({
  email: z
    .string()
    .email("Insira um email válido")
    .nonempty("Email é obrigatório"),
  password: z.string().nonempty("Senha é obrigatória").min(6,'Insira no mínimo 6 caractéres'),
});

type LoginFormSchema = z.infer<typeof loginFormSchema>;
export function useLoginForm() {
  const dispacth = useDispatch<AppDispatch>();
  const formLogin = useForm<LoginFormSchema>({
    resolver: zodResolver(loginFormSchema),
  });

  const onSubmit = async (data: LoginFormSchema) => {
    dispacth(loginRequest(data));
  };

  return { formLogin, onSubmit };
}
