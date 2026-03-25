import { ref, reactive, onMounted, watch } from "vue";

const initialFormData = () => ({
  email: "",
  tipoCadastro: "",
  nome: "",
  cpf: "",
  dataNascimento: "",
  telefone: "",
  razaoSocial: "",
  cnpj: "",
  dataAbertura: "",
  senha: "",
  confirmarSenha: "",
});

const initialErrors = () => ({
  email: "",
  tipoCadastro: "",
  nome: "",
  cpf: "",
  telefone: "",
  razaoSocial: "",
  cnpj: "",
  dataNascimento: "",
  dataAbertura: "",
  senha: "",
  confirmarSenha: "",
});

export function useRegisterFlow() {
  // Estado do passo atual (0..3)
  const currentStep = ref(0);

  // Indica se o cadastro foi concluído
  const isSuccess = ref(false);

  // Dados do formulário (estado único centralizado)
  const formData = reactive(initialFormData());

  // Mensagens de erro para validação
  const errors = reactive(initialErrors());

  // Carrega estado de sucesso persistido (se houver)
  onMounted(() => {
    const storedSuccess = localStorage.getItem("isSuccess");
    if (storedSuccess === "true") {
      isSuccess.value = true;
    }
  });

  const onlyNumbers = /^\d+$/;

  watch(
    () => formData.cpf,
    (newCpf) => {
      formData.cpf = newCpf ? newCpf.replace(/\D/g, "").slice(0, 11) : "";
    }
  );

  watch(
    () => formData.cnpj,
    (newCnpj) => {
      formData.cnpj = newCnpj ? newCnpj.replace(/\D/g, "").slice(0, 14) : "";
    }
  );

  watch(
    () => formData.telefone,
    (newTelefone) => {
      formData.telefone = newTelefone ? newTelefone.replace(/\D/g, "").slice(0, 11) : "";
    }
  );

  // Limpa todos os erros antes de cada validação
  function resetErrors() {
    Object.keys(errors).forEach((k) => {
      errors[k] = "";
    });
  }

  function validateStep() {
    resetErrors();

    if (currentStep.value === 0) {
      if (!formData.email) {
        errors.email = "O email é obrigatório.";
      }
      if (!formData.tipoCadastro) {
        errors.tipoCadastro = "Selecione PF ou PJ.";
      }
      return !!formData.email && !!formData.tipoCadastro;
    }

    if (currentStep.value === 1) {
      if (formData.tipoCadastro === "PF") {
        if (!formData.nome) {
          errors.nome = "O nome é obrigatório.";
        }
        if (!formData.cpf || !onlyNumbers.test(formData.cpf) || formData.cpf.length !== 11) {
          errors.cpf = "O CPF deve conter exatamente 11 números.";
        }
        if (!formData.dataNascimento) {
          errors.dataNascimento = "Data de nascimento é obrigatória.";
        }
        if (!formData.telefone || !onlyNumbers.test(formData.telefone) || (formData.telefone.length !== 10 && formData.telefone.length !== 11)) {
          errors.telefone = "O telefone deve ter 10 ou 11 dígitos.";
        }
        return !errors.nome && !errors.cpf && !errors.dataNascimento && !errors.telefone;
      }
      if (formData.tipoCadastro === "PJ") {
        if (!formData.razaoSocial) {
          errors.razaoSocial = "A razão social é obrigatória.";
        }
        if (!formData.cnpj || !onlyNumbers.test(formData.cnpj) || formData.cnpj.length !== 14) {
          errors.cnpj = "O CNPJ deve conter exatamente 14 números.";
        }
        if (!formData.dataAbertura) {
          errors.dataAbertura = "Data de abertura é obrigatória.";
        }
        if (!formData.telefone || !onlyNumbers.test(formData.telefone) || (formData.telefone.length !== 10 && formData.telefone.length !== 11)) {
          errors.telefone = "O telefone deve ter 10 ou 11 dígitos.";
        }
        return !errors.razaoSocial && !errors.cnpj && !errors.dataAbertura && !errors.telefone;
      }
      return false;
    }

    if (currentStep.value === 2) {
      if (!formData.senha) {
        errors.senha = "A senha é obrigatória.";
      }
      if (!formData.confirmarSenha) {
        errors.confirmarSenha = "A confirmação da senha é obrigatória.";
      }
      if (formData.senha && formData.confirmarSenha && formData.senha !== formData.confirmarSenha) {
        errors.confirmarSenha = "As senhas não coincidem.";
      }
      return !errors.senha && !errors.confirmarSenha;
    }

    return true;
  }

  function filterNumericInput(field, maxLength) {
    formData[field] = formData[field].toString().replace(/\D/g, "");
    if (formData[field].length > maxLength) {
      formData[field] = formData[field].slice(0, maxLength);
    }
  }

  // Avança para o próximo passo se a validação passar
  function nextStep() {
    if (validateStep()) {
      if (currentStep.value < 3) {
        currentStep.value += 1;
      }
      return true;
    }
    return false;
  }

  // Volta uma etapa (se possível)
  function prevStep() {
    if (currentStep.value > 0) {
      currentStep.value -= 1;
    }
  }

  // Envia dados para a API apenas na etapa de revisão (passo 3)
  async function submitForm(event) {
    if (event) event.preventDefault();
    if (currentStep.value !== 3) {
      return false;
    }

    if (!validateStep()) {
      return false;
    }

    const filteredData = {
      email: formData.email,
      tipoCadastro: formData.tipoCadastro,
      telefone: formData.telefone,
      senha: formData.senha,
      dataNascimento: formData.dataNascimento,
      dataAbertura: formData.dataAbertura,
      nome: formData.nome,
      cpf: formData.cpf,
      razaoSocial: formData.razaoSocial,
      cnpj: formData.cnpj,
    };

    if (formData.tipoCadastro === "PF") {
      delete filteredData.razaoSocial;
      delete filteredData.cnpj;
      delete filteredData.dataAbertura;
    } else if (formData.tipoCadastro === "PJ") {
      delete filteredData.nome;
      delete filteredData.cpf;
      delete filteredData.dataNascimento;
    }

    try {
      const response = await fetch("http://localhost:3000/cadastro", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(filteredData),
      });
      if (!response.ok) {
        const json = await response.json();
        throw new Error(json.error || "Erro no servidor");
      }
      localStorage.setItem("isSuccess", "true");
      isSuccess.value = true;
      return true;
    } catch (error) {
      console.error("Erro no cadastro:", error);
      return false;
    }
  }

  function resetFlow() {
    Object.assign(formData, initialFormData());
    Object.assign(errors, initialErrors());
    currentStep.value = 0;
    isSuccess.value = false;
    localStorage.removeItem("isSuccess");
  }

  return {
    currentStep,
    isSuccess,
    formData,
    errors,
    nextStep,
    prevStep,
    submitForm,
    resetFlow,
    filterNumericInput,
  };
}
