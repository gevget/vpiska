import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Check } from "lucide-react";

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
    contact: ""
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
        <div className="fixed inset-0 bg-black/95 backdrop-blur-xl z-[200] flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 30 }}
            className="bg-[#0A0A0C] border border-zinc-800 w-full max-w-xl relative overflow-hidden"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
          >
            <button 
              onClick={onClose}
              className="absolute top-6 right-6 text-zinc-500 hover:text-white transition-colors z-10 p-2 hover:bg-white/5 rounded-full"
              aria-label="Закрыть окно"
            >
              <X size={24} />
            </button>

            <div className="p-8 sm:p-12 space-y-10">
              <div className="space-y-3">
                <span className="text-[10px] font-mono text-[#FF007F] uppercase tracking-[0.5em] block font-black">B2B REGISTER // 2026</span>
                <h3 id="modal-title" className="text-3xl font-display font-black text-white uppercase leading-none tracking-tight">РЕГИСТРАЦИЯ ПАРТНЁРА</h3>
                <p className="text-xs text-zinc-500 font-sans leading-relaxed">
                  Оставьте запрос на получение расширенной B2B-презентации и спецификаций партнерских пакетов Digital Вписка Afterparty.
                </p>
              </div>

              {context && (
                <div className="p-4 bg-zinc-950/80 border border-zinc-900 text-[10px] font-mono text-[#00FF41] uppercase tracking-wider font-bold">
                  FOCUS_CONTEXT: &ldquo;{context}&rdquo;
                </div>
              )}

              {isSuccess ? (
                <div className="py-16 text-center space-y-6 bg-[#00FF41]/5 border border-[#00FF41]/20">
                  <motion.div 
                    initial={{ scale: 0 }} 
                    animate={{ scale: 1 }} 
                    className="w-16 h-16 rounded-full border-2 border-[#00FF41] flex items-center justify-center mx-auto"
                  >
                    <Check className="w-8 h-8 text-[#00FF41]" />
                  </motion.div>
                  <div className="space-y-2">
                    <p className="text-sm font-mono text-[#00FF41] uppercase tracking-widest font-black">РЕГИСТРАЦИЯ ЗАВЕРШЕНА</p>
                    <p className="text-xs text-zinc-400 font-sans max-w-sm mx-auto leading-relaxed">Презентация и пакет документов будут направлены вам в течение 1 рабочего часа.</p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="space-y-1">
                    <label className="text-[10px] text-zinc-500 uppercase tracking-widest block font-black">НАЗВАНИЕ КОМПАНИИ *</label>
                    <input
                      type="text"
                      required
                      value={formData.company}
                      onChange={e => setFormData({...formData, company: e.target.value})}
                      placeholder="Например: TOLK, Yandex..."
                      className="w-full bg-black border border-zinc-900 text-white p-4 font-mono text-sm focus:ring-1 focus:ring-[#FF007F] focus:border-[#FF007F] outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] text-zinc-500 uppercase tracking-widest block font-black">ИМЯ ПРЕДСТАВИТЕЛЯ *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={e => setFormData({...formData, name: e.target.value})}
                      className="w-full bg-black border border-zinc-900 text-white p-4 font-mono text-sm focus:ring-1 focus:ring-[#FF007F] focus:border-[#FF007F] outline-none transition-all"
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-1">
                      <label className="text-[10px] text-zinc-500 uppercase tracking-widest block font-black">ТЕЛЕФОН / СВЯЗЬ *</label>
                      <input
                        type="text"
                        required
                        value={formData.phone}
                        onChange={e => setFormData({...formData, phone: e.target.value})}
                        placeholder="+7 (999) 000-00-00"
                        className="w-full bg-black border border-zinc-900 text-white p-4 font-mono text-xs focus:ring-1 focus:ring-[#FF007F] focus:border-[#FF007F] outline-none transition-all"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] text-zinc-500 uppercase tracking-widest block font-black">TG ИЛИ EMAIL *</label>
                      <input
                        type="text"
                        required
                        value={formData.contact}
                        onChange={e => setFormData({...formData, contact: e.target.value})}
                        placeholder="@username"
                        className="w-full bg-black border border-zinc-900 text-white p-4 font-mono text-xs focus:ring-1 focus:ring-[#FF007F] focus:border-[#FF007F] outline-none transition-all"
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-5 bg-[#00FF41] hover:bg-white text-black font-mono font-black text-xs uppercase tracking-[0.3em] transition-all disabled:opacity-50"
                  >
                    {isSubmitting ? "РЕЗЕРВИРОВАНИЕ..." : "ОТПРАВИТЬ ЗАПРОС НА УЧАСТИЕ"}
                  </button>
                  <p className="text-[9px] text-zinc-700 text-center uppercase tracking-tighter">
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
