import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowRight, Mail, Lock, User } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { Header } from '@/components/Header';

const Auth = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(false);
  const { signIn, signUp, user } = useAuth();
  const navigate = useNavigate();

  // Redirect if already authenticated
  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (isSignUp) {
      if (!fullName.trim()) {
        setLoading(false);
        return;
      }
      await signUp(email, password, fullName);
    } else {
      const result = await signIn(email, password);
      if (!result.error) {
        navigate('/');
      }
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted">
      <Header />
      
      <div className="container mx-auto px-4 pt-24 pb-16">
        <div className="max-w-md mx-auto">
          <Card className="p-8 shadow-glow border-0 card-gradient">
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold text-foreground mb-2">
                {isSignUp ? 'إنشاء حساب جديد' : 'تسجيل الدخول'}
              </h1>
              <p className="text-muted-foreground">
                {isSignUp 
                  ? 'أدخل بياناتك لإنشاء حساب جديد' 
                  : 'أدخل بياناتك للدخول إلى حسابك'
                }
              </p>
            </div>

            <Tabs value={isSignUp ? 'signup' : 'signin'} onValueChange={(value) => setIsSignUp(value === 'signup')}>
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="signin">تسجيل الدخول</TabsTrigger>
                <TabsTrigger value="signup">حساب جديد</TabsTrigger>
              </TabsList>

              <form onSubmit={handleSubmit} className="space-y-4">
                <TabsContent value="signup" className="space-y-4 mt-0">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">الاسم الكامل</Label>
                    <div className="relative">
                      <User className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="fullName"
                        type="text"
                        placeholder="أدخل اسمك الكامل"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="pr-10"
                        required={isSignUp}
                      />
                    </div>
                  </div>
                </TabsContent>

                <div className="space-y-2">
                  <Label htmlFor="email">البريد الإلكتروني</Label>
                  <div className="relative">
                    <Mail className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="example@domain.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pr-10"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">كلمة المرور</Label>
                  <div className="relative">
                    <Lock className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="password"
                      type="password"
                      placeholder="أدخل كلمة المرور"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pr-10"
                      required
                    />
                  </div>
                </div>

                <Button 
                  type="submit" 
                  className="w-full group" 
                  disabled={loading}
                  variant="hero"
                >
                  {loading ? 'جاري المعالجة...' : (isSignUp ? 'إنشاء الحساب' : 'تسجيل الدخول')}
                  <ArrowRight className="mr-2 group-hover:translate-x-1 transition-transform" size={16} />
                </Button>
              </form>

              <div className="text-center mt-6">
                <p className="text-sm text-muted-foreground">
                  {isSignUp ? 'لديك حساب بالفعل؟' : 'ليس لديك حساب؟'}
                  <Button 
                    variant="link" 
                    className="pr-2" 
                    onClick={() => setIsSignUp(!isSignUp)}
                  >
                    {isSignUp ? 'تسجيل الدخول' : 'إنشاء حساب جديد'}
                  </Button>
                </p>
              </div>
            </Tabs>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Auth;