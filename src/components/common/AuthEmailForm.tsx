import EmailInputBar from "./EmailInputBar";

interface AuthEmailFormProps {
  email: string;
  setEmail: (email: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  loading: boolean;
}

export default function AuthEmailForm({ email, setEmail, onSubmit, loading }: AuthEmailFormProps) {
  return (
    <EmailInputBar
      email={email}
      setEmail={setEmail}
      onSubmit={onSubmit}
      loading={loading}
      buttonText={loading ? "Sending..." : "Sign In"}
      buttonColor="secondary"
      textFieldBg="white"
      maxWidth={500}
      captionText="We'll send a magic link to your inbox. No password required!"
    />
  );
}