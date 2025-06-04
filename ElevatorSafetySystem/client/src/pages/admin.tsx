import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowLeft, Users, Calendar, Phone, Building, LogOut } from "lucide-react";
import { Link } from "wouter";
import type { Consultation } from "@shared/schema";
import AdminLogin from "./admin-login";

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const authStatus = localStorage.getItem("adminAuth");
    setIsAuthenticated(authStatus === "true");
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("adminAuth");
    setIsAuthenticated(false);
  };

  const { data: consultationsData, isLoading, error } = useQuery<{
    success: boolean;
    consultations: Consultation[];
  }>({
    queryKey: ["/api/consultations"],
    enabled: isAuthenticated, // ✅ 로그인된 경우에만 실행
  });

  if (!isAuthenticated) {
    return <AdminLogin onLogin={handleLogin} />;
  }

  const consultations = consultationsData?.consultations || [];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">상담 목록을 불러오는 중...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md mx-4">
          <CardContent className="pt-6 text-center">
            <div className="text-red-500 mb-4">
              <svg className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">오류 발생</h3>
            <p className="text-gray-600 mb-4">상담 목록을 불러오는 중 오류가 발생했습니다.</p>
            <Link href="/">
              <Button>
                <ArrowLeft className="mr-2 h-4 w-4" />
                홈으로 돌아가기
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link href="/">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  홈으로
                </Button>
              </Link>
              <div className="h-6 w-px bg-gray-300"></div>
              <h1 className="text-xl font-bold text-gray-900">관리자 패널</h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Building className="h-5 w-5 text-primary" />
                <span className="font-medium text-gray-900">드림포레스트 보험대리점</span>
              </div>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                로그아웃
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">총 상담 신청</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{consultations.length}</div>
              <p className="text-xs text-muted-foreground">전체 신청 건수</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">오늘 신청</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {consultations.filter(c => {
                  const today = new Date().toDateString();
                  const consultationDate = new Date(c.createdAt).toDateString();
                  return today === consultationDate;
                }).length}
              </div>
              <p className="text-xs text-muted-foreground">오늘 접수된 건수</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">이번 주 신청</CardTitle>
              <Phone className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {consultations.filter(c => {
                  const weekAgo = new Date();
                  weekAgo.setDate(weekAgo.getDate() - 7);
                  return new Date(c.createdAt) >= weekAgo;
                }).length}
              </div>
              <p className="text-xs text-muted-foreground">최근 7일간 신청</p>
            </CardContent>
          </Card>
        </div>

        {/* Consultations Table */}
        <Card>
          <CardHeader>
            <CardTitle>상담 신청 목록</CardTitle>
          </CardHeader>
          <CardContent>
            {consultations.length === 0 ? (
              <div className="text-center py-12">
                <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">상담 신청이 없습니다</h3>
                <p className="text-gray-500">아직 접수된 상담 신청이 없습니다.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>신청일시</TableHead>
                      <TableHead>성명</TableHead>
                      <TableHead>연락처</TableHead>
                      <TableHead>승강기 번호</TableHead>
                      <TableHead>소재지</TableHead>
                      <TableHead>문의사항</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {consultations.map((consultation) => (
                      <TableRow key={consultation.id}>
                        <TableCell className="font-medium">
                          {new Date(consultation.createdAt).toLocaleString('ko-KR')}
                        </TableCell>
                        <TableCell>{consultation.name}</TableCell>
                        <TableCell>{consultation.phone}</TableCell>
                        <TableCell>{consultation.elevatorNumber}</TableCell>
                        <TableCell className="max-w-xs truncate" title={consultation.elevatorLocation}>
                          {consultation.elevatorLocation}
                        </TableCell>
                        <TableCell className="max-w-xs truncate" title={consultation.inquiry || ""}>
                          {consultation.inquiry || "-"}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}