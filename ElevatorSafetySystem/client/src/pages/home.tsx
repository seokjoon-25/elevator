import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { insertConsultationSchema, type InsertConsultation } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Phone, Building, Users, Hammer, Shield, CheckCircle, MapPin, Mail, Clock } from "lucide-react";
import { Link } from "wouter";

export default function Home() {
  const { toast } = useToast();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const form = useForm<InsertConsultation>({
    resolver: zodResolver(insertConsultationSchema),
    defaultValues: {
      name: "",
      phone: "",
      elevatorNumber: "",
      elevatorLocation: "",
      inquiry: "",
    },
  });

  const consultationMutation = useMutation({
    mutationFn: async (data: InsertConsultation) => {
      const response = await apiRequest("POST", "/api/consultations", data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "상담 신청 완료",
        description: "상담 신청이 성공적으로 접수되었습니다. 빠른 시일 내에 연락드리겠습니다.",
      });
      form.reset();
    },
    onError: () => {
      toast({
        title: "오류 발생",
        description: "상담 신청 중 오류가 발생했습니다. 다시 시도해주세요.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: InsertConsultation) => {
    consultationMutation.mutate(data);
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setMobileMenuOpen(false);
    }
  };

  return (
    <div className="font-sans">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <Building className="text-white h-5 w-5" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-gray-900">드림포레스트 보험대리점</h1>
                <p className="text-sm text-gray-600">승강기사고배상책임보험 전문</p>
              </div>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <div className="flex items-center space-x-2 text-gray-600">
                <Phone className="h-4 w-4 text-primary" />
                <span>02-561-5599</span>
              </div>
              <nav className="flex space-x-6">
                <button 
                  onClick={() => scrollToSection("insurance-info")}
                  className="text-gray-700 hover:text-primary transition-colors"
                >
                  보험안내
                </button>
                <button 
                  onClick={() => scrollToSection("agency-info")}
                  className="text-gray-700 hover:text-primary transition-colors"
                >
                  대리점정보
                </button>
                <button 
                  onClick={() => scrollToSection("consultation")}
                  className="text-gray-700 hover:text-primary transition-colors"
                >
                  상담신청
                </button>
              </nav>
            </div>
            
            <button 
              className="md:hidden p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
          
          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-gray-100">
              <div className="space-y-4">
                <div className="flex items-center space-x-2 text-gray-600 pb-4 border-b">
                  <Phone className="h-4 w-4 text-primary" />
                  <span>02-561-5599</span>
                </div>
                <button 
                  onClick={() => scrollToSection("insurance-info")}
                  className="block text-gray-700 hover:text-primary transition-colors"
                >
                  보험안내
                </button>
                <button 
                  onClick={() => scrollToSection("agency-info")}
                  className="block text-gray-700 hover:text-primary transition-colors"
                >
                  대리점정보
                </button>
                <button 
                  onClick={() => scrollToSection("consultation")}
                  className="block text-gray-700 hover:text-primary transition-colors"
                >
                  상담신청
                </button>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="gradient-bg relative min-h-screen flex items-center overflow-hidden">
        {/* Floating Background Shapes */}
        <div className="absolute inset-0">
          <div className="floating-shape shape-1"></div>
          <div className="floating-shape shape-2"></div>
          <div className="floating-shape shape-3"></div>
          <div className="floating-shape shape-4"></div>
          <div className="floating-shape shape-5"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-white flex flex-col items-center lg:items-start text-center lg:text-left lg:ml-16">
              <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight">
                승강기사고<br />
                배상책임보험
              </h1>
              <div className="text-lg lg:text-xl mb-8 opacity-90 leading-relaxed">
                <p className="mb-2">안전한 승강기 운영을 위한 필수 보험</p>
                <p>전문적인 상담과 맞춤형 보장을 제공합니다</p>
              </div>
              <Button 
                onClick={() => scrollToSection("consultation")}
                className="bg-white text-primary px-8 py-4 rounded-lg font-medium hover:bg-gray-50 transition-all transform hover:scale-105"
                size="lg"
              >
                <Phone className="mr-2 h-5 w-5" />
                상담 신청하기
              </Button>
            </div>
            
            <div className="relative flex justify-end">
              <div className="elevator-container">
                <div className="elevator-shaft"></div>
                <div className="elevator-car">
                  <div className="elevator-door"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Insurance Info Section */}
      <section id="insurance-info" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              승강기사고배상책임보험이란?
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              승강기 운행 중 발생할 수 있는 사고로 인한 배상책임을 보장하는 필수 보험입니다
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="bg-gray-50 p-8 rounded-2xl hover:shadow-lg transition-all transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mb-6">
                <Shield className="text-white h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">법정의무보험</h3>
              <p className="text-gray-600 leading-relaxed">
                승강기안전관리법에 따른 의무가입 보험으로 법적 요구사항을 충족합니다
              </p>
            </div>
            
            <div className="bg-gray-50 p-8 rounded-2xl hover:shadow-lg transition-all transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-cyan-500 rounded-2xl flex items-center justify-center mb-6">
                <Users className="text-white h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">인명피해 보장</h3>
              <p className="text-gray-600 leading-relaxed">
                승강기 사고로 인한 사망, 부상 등 인명피해에 대한 배상책임을 보장합니다
              </p>
            </div>
            
            <div className="bg-gray-50 p-8 rounded-2xl hover:shadow-lg transition-all transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mb-6">
                <Hammer className="text-white h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">재물손해 보장</h3>
              <p className="text-gray-600 leading-relaxed">
                승강기 사고로 인한 재물 손해에 대한 배상책임을 보장합니다
              </p>
            </div>
          </div>
          
          {/* Insurance Period Section */}
          <div className="bg-blue-50 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">보험가입 시기</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
                <span className="text-gray-700">법 제28조제1항에 따른 설치검사를 받은 날</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
                <span className="text-gray-700">관리주체가 변경된 경우 그 변경된 날</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
                <span className="text-gray-700">책임보험의 만료일 이내</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Agency Info Section */}
      <section id="agency-info" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              보험대리점 정보
            </h2>
            <p className="text-lg text-gray-600">
              승강기보험 전문 대리점으로 최적의 보험상품을 제공합니다
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600" 
                alt="드림포레스트 보험대리점 사무실 내부" 
                className="rounded-2xl shadow-lg w-full h-auto" 
              />
              <div className="absolute bottom-4 right-4 bg-primary text-white px-4 py-2 rounded-lg font-bold">
                <div className="text-center">
                  <div className="text-lg">Since</div>
                  <div className="text-xl">2013</div>
                </div>
              </div>
            </div>
            
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">드림포레스트 보험대리점</h3>
                <p className="text-gray-600 leading-relaxed mb-6">
                  10년이 넘는 경험으로 승강기사고배상책임보험 전문 서비스를 제공하는 대리점입니다. 
                  고객의 안전과 보장을 최우선으로 하며, 맞춤형 보험상품을 통해 최적의 보험료와 보장내용을 제공드립니다.
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-md">
                  <div className="flex items-center space-x-3 mb-2">
                    <Building className="h-5 w-5 text-primary" />
                    <span className="font-medium text-gray-900">상호명</span>
                  </div>
                  <p className="text-gray-700">드림포레스트 보험대리점</p>
                </div>
                
                <div className="bg-white p-6 rounded-xl shadow-md">
                  <div className="flex items-center space-x-3 mb-2">
                    <Phone className="h-5 w-5 text-primary" />
                    <span className="font-medium text-gray-900">전화번호</span>
                  </div>
                  <p className="text-gray-700">02-561-5599</p>
                </div>
                
                <div className="bg-white p-6 rounded-xl shadow-md">
                  <div className="flex items-center space-x-3 mb-2">
                    <Mail className="h-5 w-5 text-primary" />
                    <span className="font-medium text-gray-900">이메일</span>
                  </div>
                  <p className="text-gray-700">psj@ndongbu.com</p>
                </div>
                
                <div className="bg-white p-6 rounded-xl shadow-md">
                  <div className="flex items-center space-x-3 mb-2">
                    <MapPin className="h-5 w-5 text-primary" />
                    <span className="font-medium text-gray-900">주소</span>
                  </div>
                  <p className="text-gray-700">서울특별시 강남구 테헤란로 116, 6층</p>
                </div>
                
                <div className="bg-white p-6 rounded-xl shadow-md md:col-span-2">
                  <div className="flex items-center space-x-3 mb-2">
                    <Clock className="h-5 w-5 text-primary" />
                    <span className="font-medium text-gray-900">영업시간</span>
                  </div>
                  <p className="text-gray-700">평일 09:00 - 18:00 (토요일 09:00 - 13:00, 일요일 휴무)</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Consultation Section */}
      <section id="consultation" className="gradient-bg py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">상담 신청</h2>
            <p className="text-lg text-white opacity-90">전문 상담원이 최적의 보험상품을 제안해드립니다</p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Consultation Form */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-white mb-8 flex items-center">
                <Mail className="mr-3 h-6 w-6" />
                상담 신청
              </h3>
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white font-medium">성명</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="성명을 입력해주세요" 
                            {...field}
                            className="bg-white/20 border-white/30 text-white placeholder:text-white/60 focus:border-white focus:ring-white/20"
                          />
                        </FormControl>
                        <FormMessage className="text-red-200" />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white font-medium">연락처</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="010-0000-0000" 
                            {...field}
                            className="bg-white/20 border-white/30 text-white placeholder:text-white/60 focus:border-white focus:ring-white/20"
                          />
                        </FormControl>
                        <FormMessage className="text-red-200" />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="elevatorNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white font-medium">승강기 번호</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="예: EL 2023-001" 
                            {...field}
                            className="bg-white/20 border-white/30 text-white placeholder:text-white/60 focus:border-white focus:ring-white/20"
                          />
                        </FormControl>
                        <FormMessage className="text-red-200" />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="elevatorLocation"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white font-medium">승강기 소재지 주소</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="서울특별시 강남구..." 
                            {...field}
                            className="bg-white/20 border-white/30 text-white placeholder:text-white/60 focus:border-white focus:ring-white/20"
                          />
                        </FormControl>
                        <FormMessage className="text-red-200" />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="inquiry"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white font-medium">문의사항</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="궁금한 사항을 남겨주세요..." 
                            value={field.value || ""}
                            onChange={field.onChange}
                            onBlur={field.onBlur}
                            name={field.name}
                            ref={field.ref}
                            className="bg-white/20 border-white/30 text-white placeholder:text-white/60 focus:border-white focus:ring-white/20 h-32 resize-none"
                          />
                        </FormControl>
                        <FormMessage className="text-red-200" />
                      </FormItem>
                    )}
                  />
                  
                  <Button 
                    type="submit" 
                    disabled={consultationMutation.isPending}
                    className="w-full bg-white text-primary py-4 rounded-lg font-bold hover:bg-gray-50 transition-all transform hover:scale-105"
                    size="lg"
                  >
                    <Mail className="mr-2 h-5 w-5" />
                    {consultationMutation.isPending ? "신청 중..." : "상담 신청하기"}
                  </Button>
                </form>
              </Form>
            </div>
            
            {/* Quick Contact Info */}
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-white mb-6">빠른 상담 문의</h3>
                <p className="text-white/80 mb-8">전화 또는 온라인으로 언제든 상담받으실 수 있습니다</p>
              </div>
              
              <div className="space-y-6">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                      <Phone className="text-primary h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="text-white font-bold">전화 상담</h4>
                      <p className="text-white/80 text-lg font-bold">02-561-5599</p>
                      <p className="text-white/60 text-sm">평일 09:00 - 18:00</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                      <Mail className="text-primary h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="text-white font-bold">이메일</h4>
                      <p className="text-white/80">psj@ndongbu.com</p>
                      <p className="text-white/60 text-sm">24시간 내 답변</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Insurance Features */}
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <h4 className="text-white font-bold mb-4">상담</h4>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-6 w-6 text-green-400" />
                    <span className="text-white/80">맞춤형 보장 설계</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-6 w-6 text-green-400" />
                    <span className="text-white/80">전문가 컨설팅</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-6 w-6 text-green-400" />
                    <span className="text-white/80">신속한 가입 처리</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-4 gap-8 mb-12">
            <div className="lg:col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                  <Building className="text-white h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">드림포레스트 보험대리점</h3>
                  <p className="text-gray-400">승강기사고배상책임보험 전문</p>
                </div>
              </div>
              <p className="text-gray-300 leading-relaxed mb-6">
                10년이 넘는 경험으로 고객의 안전과 보장을 최우선으로 하는 보험대리점입니다. 
                승강기사고배상책임보험 전문 서비스를 통해 최적의 보험상품을 제공합니다.
              </p>
            </div>
            
            <div>
              <h4 className="text-lg font-bold mb-6">빠른 링크</h4>
              <div className="space-y-3">
                <button 
                  onClick={() => scrollToSection("insurance-info")}
                  className="block text-gray-300 hover:text-white transition-colors"
                >
                  보험안내
                </button>
                <button 
                  onClick={() => scrollToSection("agency-info")}
                  className="block text-gray-300 hover:text-white transition-colors"
                >
                  대리점정보
                </button>
                <button 
                  onClick={() => scrollToSection("consultation")}
                  className="block text-gray-300 hover:text-white transition-colors"
                >
                  상담신청
                </button>
                <Link href="/admin" className="block text-gray-300 hover:text-white transition-colors">
                  관리자
                </Link>
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-bold mb-6">연락처</h4>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-primary" />
                  <span>02-561-5599</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-primary" />
                  <span>psj@ndongbu.com</span>
                </div>
                <div className="flex items-start space-x-3">
                  <MapPin className="h-5 w-5 text-primary mt-1" />
                  <span>서울 강남구 테헤란로 116</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8">
            <div className="text-center text-gray-400">
              <p className="mb-2">© 2025 드림포레스트 보험대리점. All rights reserved. | 승강기사고배상책임보험 전문대리점</p>
              <p className="text-sm">대표 : 박석준 | 대리점 등록번호 : 2013080138 | 사업자등록번호 : 220-91-21382</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
