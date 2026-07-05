import React, { useState } from 'react';
import { X, Mail, Lock, User, Phone, Loader2, CheckCircle2 } from 'lucide-react';
import { auth, db } from '../lib/firebase';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  updateProfile 
} from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { Language } from '../types';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLang: Language;
}

export default function AuthModal({ isOpen, onClose, currentLang }: AuthModalProps) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  if (!isOpen) return null;

  const labels = {
    en: {
      loginTitle: 'Welcome Back',
      signUpTitle: 'Create an Account',
      loginSub: 'Log in to manage bookings and auto-fill checkout details.',
      signUpSub: 'Register once and save time on all your future bookings.',
      email: 'Email Address',
      password: 'Password',
      fullName: 'Full Name',
      phone: 'WhatsApp / Phone Number',
      loginBtn: 'Log In',
      signUpBtn: 'Create Account',
      noAccount: "Don't have an account?",
      hasAccount: 'Already have an account?',
      registerNow: 'Sign up here',
      loginNow: 'Log in here',
      invalidEmail: 'Please enter a valid email.',
      passwordLength: 'Password must be at least 6 characters.',
      nameRequired: 'Full name is required.',
      phoneRequired: 'Phone number is required.',
      successLogin: 'Successfully signed in!',
      successRegister: 'Account created successfully!',
    },
    fr: {
      loginTitle: 'Bon retour',
      signUpTitle: 'Créer un compte',
      loginSub: 'Connectez-vous pour pré-remplir vos informations de réservation.',
      signUpSub: 'Inscrivez-vous une fois et gagnez du temps sur toutes vos réservations.',
      email: 'Adresse e-mail',
      password: 'Mot de passe',
      fullName: 'Nom complet',
      phone: 'Numéro de téléphone / WhatsApp',
      loginBtn: 'Se connecter',
      signUpBtn: 'Créer le compte',
      noAccount: "Vous n'avez pas de compte ?",
      hasAccount: 'Vous avez déjà un compte ?',
      registerNow: "S'inscrire ici",
      loginNow: 'Se connecter ici',
      invalidEmail: 'Veuillez entrer un e-mail valide.',
      passwordLength: 'Le mot de passe doit contenir au moins 6 caractères.',
      nameRequired: 'Le nom complet est requis.',
      phoneRequired: 'Le numéro de téléphone est requis.',
      successLogin: 'Connexion réussie !',
      successRegister: 'Compte créé avec succès !',
    }
  }[currentLang];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsLoading(true);

    // Basic validation
    if (!email || !email.includes('@')) {
      setError(labels.invalidEmail);
      setIsLoading(false);
      return;
    }
    if (password.length < 6) {
      setError(labels.passwordLength);
      setIsLoading(false);
      return;
    }

    try {
      if (isSignUp) {
        if (!fullName.trim()) {
          setError(labels.nameRequired);
          setIsLoading(false);
          return;
        }
        if (!phone.trim()) {
          setError(labels.phoneRequired);
          setIsLoading(false);
          return;
        }

        // 1. Create firebase user
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // 2. Set user display name
        await updateProfile(user, { displayName: fullName });

        // 3. Create document in Firestore users collection
        await setDoc(doc(db, 'users', user.uid), {
          fullName,
          email,
          phone,
          createdAt: new Date().toISOString()
        });

        setSuccess(labels.successRegister);
      } else {
        // Log in
        await signInWithEmailAndPassword(auth, email, password);
        setSuccess(labels.successLogin);
      }

      // Success fadeout
      setTimeout(() => {
        onClose();
        // Clear forms
        setEmail('');
        setPassword('');
        setFullName('');
        setPhone('');
        setSuccess('');
      }, 1500);

    } catch (err: any) {
      console.error(err);
      let errMsg = err.message;
      if (err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password' || err.code === 'auth/invalid-credential') {
        errMsg = currentLang === 'en' 
          ? 'Invalid email or password.' 
          : 'Adresse e-mail ou mot de passe incorrect.';
      } else if (err.code === 'auth/email-already-in-use') {
        errMsg = currentLang === 'en'
          ? 'This email address is already registered.'
          : 'Cette adresse e-mail est déjà enregistrée.';
      }
      setError(errMsg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs transition-opacity" 
        onClick={onClose}
      />

      {/* Main Container */}
      <div className="relative bg-white dark:bg-slate-950 rounded-2xl max-w-md w-full shadow-2xl border border-gray-100 dark:border-slate-850 p-6 sm:p-8 overflow-hidden transition-all animate-fade-in text-gray-850 dark:text-gray-100">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 dark:hover:text-white rounded-full transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="space-y-6">
          <div className="text-center">
            <span className="text-[9px] font-black uppercase tracking-widest text-blue-600 dark:text-yellow-400 block mb-1 font-mono">
              ★ FLEXIRENT AUTH
            </span>
            <h3 className="text-xl font-display font-black text-gray-900 dark:text-white uppercase tracking-tight">
              {isSignUp ? labels.signUpTitle : labels.loginTitle}
            </h3>
            <p className="text-xs text-gray-400 mt-1.5 max-w-xs mx-auto">
              {isSignUp ? labels.signUpSub : labels.loginSub}
            </p>
          </div>

          {/* Success or Error messages */}
          {error && (
            <div className="p-3 bg-red-50 dark:bg-red-950/30 border border-red-100 dark:border-red-900 text-red-600 dark:text-red-400 rounded-xl text-xs font-semibold">
              {error}
            </div>
          )}

          {success && (
            <div className="p-3 bg-green-50 dark:bg-green-950/30 border border-green-100 dark:border-green-900 text-green-600 dark:text-green-400 rounded-xl text-xs font-semibold flex items-center space-x-2">
              <CheckCircle2 className="h-4 w-4 shrink-0" />
              <span>{success}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 text-xs font-semibold">
            {isSignUp && (
              <>
                {/* Full Name */}
                <div className="space-y-1">
                  <label className="text-gray-500 dark:text-gray-400 flex items-center space-x-1.5">
                    <User className="h-3.5 w-3.5" />
                    <span>{labels.fullName}</span>
                  </label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Achille Ebang"
                    className="w-full bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-xl px-3.5 py-2.5 text-xs font-medium focus:outline-hidden text-gray-900 dark:text-white"
                    required
                  />
                </div>

                {/* Phone */}
                <div className="space-y-1">
                  <label className="text-gray-500 dark:text-gray-400 flex items-center space-x-1.5">
                    <Phone className="h-3.5 w-3.5" />
                    <span>{labels.phone}</span>
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+250 780 097 079"
                    className="w-full bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-xl px-3.5 py-2.5 text-xs font-medium focus:outline-hidden text-gray-900 dark:text-white"
                    required
                  />
                </div>
              </>
            )}

            {/* Email */}
            <div className="space-y-1">
              <label className="text-gray-500 dark:text-gray-400 flex items-center space-x-1.5">
                <Mail className="h-3.5 w-3.5" />
                <span>{labels.email}</span>
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-xl px-3.5 py-2.5 text-xs font-medium focus:outline-hidden text-gray-900 dark:text-white"
                required
              />
            </div>

            {/* Password */}
            <div className="space-y-1">
              <label className="text-gray-500 dark:text-gray-400 flex items-center space-x-1.5">
                <Lock className="h-3.5 w-3.5" />
                <span>{labels.password}</span>
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-xl px-3.5 py-2.5 text-xs font-medium focus:outline-hidden text-gray-900 dark:text-white"
                required
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-yellow-400 dark:hover:bg-yellow-500 text-white dark:text-slate-950 font-bold py-3 rounded-xl text-xs tracking-wider uppercase transition-colors cursor-pointer flex items-center justify-center space-x-2 disabled:opacity-50 mt-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>{isSignUp ? labels.signUpBtn : labels.loginBtn}</span>
                </>
              ) : (
                <span>{isSignUp ? labels.signUpBtn : labels.loginBtn}</span>
              )}
            </button>
          </form>

          {/* Toggle login / signup */}
          <div className="pt-4 border-t border-gray-100 dark:border-slate-850 text-center text-xs text-gray-500 dark:text-gray-400 font-medium">
            <span>{isSignUp ? labels.hasAccount : labels.noAccount} </span>
            <button
              onClick={() => {
                setIsSignUp(!isSignUp);
                setError('');
                setSuccess('');
              }}
              className="text-blue-600 dark:text-yellow-400 font-bold hover:underline cursor-pointer"
            >
              {isSignUp ? labels.loginNow : labels.registerNow}
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
