import React from "react";
import { AnimatePresence, motion } from "motion/react";
import { Check, X } from "lucide-react";

interface LeadModalProps {
  isOpen: boolean;
  onClose: () => void;
  context: string;
}

const LeadModal = ({ isOpen, onClose, context }: LeadModalProps) => {
  const [formData, setFormData] = React.useState({
    company: "",
    name: "",
    phone: "",
    contact: "",
  });
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        onClose();
      }, 3000);
    }, 1500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/95 p-4 backdrop-blur-xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 30 }}
            className="relative w-full max-w-xl overflow-hidden border border-zinc-800 bg-[#0A0A0C]"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
          >
            <button
              onClick={onClose}
              className="absolute right-6 top-6 z-10 rounded-full p-2 text-zinc-500 transition-colors hover:bg-white/5 hover:text-white"
              aria-label="Закрыть окно"
            >
              <X size={24} />
            </button>

            <div className="space-y-10 p-8 sm:p-12">
              <div className="space-y-3">
                <span className="block text-[10px] font-mono font-black uppercase tracking-[0.5em] text-[#FF007F]">29 ОКТЯБРЯ // ПАРТНЁРСКИЙ ЗАПРОС</span>
                <h3 id="modal-title" className="font-display text-3xl font-black uppercase leading-none tracking-tight text-white">
                  ЗАПРОС НА УЧАСТИЕ
                </h3>
                <p className="text-xs leading-relaxed text-zinc-500">
                  Оставьте заявку, и мы покажем форматы участия, варианты интеграции и детали по партнёрским слотам.
                </p>
              </div>

              {context && (
                <div className="border border-zinc-900 bg-zinc-950/80 p-4 text-[10px] font-mono font-bold uppercase tracking-wider text-[#BEEB08]">
                  Focus context: &ldquo;{context}&rdquo;
                </div>
              )}

              {isSuccess ? (
                <div className="space-y-6 border border-[#BEEB08]/20 bg-[#BEEB08]/5 py-16 text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border-2 border-[#BEEB08]"
                  >
                    <Check className="h-8 w-8 text-[#BEEB08]" />
                  </motion.div>
                  <div className="space-y-2">
                    <p className="text-sm font-mono font-black uppercase tracking-widest text-[#BEEB08]">ЗАПРОС ОТПРАВЛЕН</p>
                    <p className="mx-auto max-w-sm text-xs leading-relaxed text-zinc-400">
                      Мы получили ваш запрос. Вернёмся с материалами и деталями в ближайшее время.
                    </p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="space-y-1">
                    <label className="block text-[10px] font-black uppercase tracking-widest text-zinc-500">Название компании *</label>
                    <input
                      type="text"
                      required
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      placeholder="Например: TOLK, Yandex..."
                      className="w-full border border-zinc-900 bg-black p-4 text-sm text-white outline-none transition-all focus:border-[#FF007F] focus:ring-1 focus:ring-[#FF007F]"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="block text-[10px] font-black uppercase tracking-widest text-zinc-500">Имя представителя *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full border border-zinc-900 bg-black p-4 text-sm text-white outline-none transition-all focus:border-[#FF007F] focus:ring-1 focus:ring-[#FF007F]"
                    />
                  </div>
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div className="space-y-1">
                      <label className="block text-[10px] font-black uppercase tracking-widest text-zinc-500">Телефон / связь *</label>
                      <input
                        type="text"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+7 (999) 000-00-00"
                        className="w-full border border-zinc-900 bg-black p-4 text-xs text-white outline-none transition-all focus:border-[#FF007F] focus:ring-1 focus:ring-[#FF007F]"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="block text-[10px] font-black uppercase tracking-widest text-zinc-500">Telegram *</label>
                      <input
                        type="text"
                        required
                        value={formData.contact}
                        onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                        placeholder="@username"
                        className="w-full border border-zinc-900 bg-black p-4 text-xs text-white outline-none transition-all focus:border-[#FF007F] focus:ring-1 focus:ring-[#FF007F]"
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#BEEB08] py-5 text-xs font-mono font-black uppercase tracking-[0.3em] text-black transition-all hover:bg-white disabled:opacity-50"
                  >
                    {isSubmitting ? "ОТПРАВКА..." : "ОТПРАВИТЬ ЗАПРОС НА УЧАСТИЕ"}
                  </button>
                  <p className="text-center text-[9px] uppercase tracking-tighter text-zinc-700">
                    * B2B-запросы обрабатываются кураторами оргкомитета конфиденциально.
                  </p>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default LeadModal;
