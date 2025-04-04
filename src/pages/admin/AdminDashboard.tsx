// AdminDashboard.tsx - Similar to regular Dashboard but with admin stats
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";
import relianceInsurer from '../../assets/reliance-insurer.svg';

const AdminDashboard = () => {
    const isMobile = useIsMobile();

    // Admin-specific stats
    const statsCards = [
        {
            id: 1,
            title: "Total Members",
            value: "254",
            change: "+12%",
            changeType: "positive"
        },
        {
            id: 2,
            title: "Active Policies",
            value: "18",
            change: "+3",
            changeType: "positive"
        },
        {
            id: 3,
            title: "Open Claims",
            value: "24",
            change: "-5%",
            changeType: "negative"
        },
        {
            id: 4,
            title: "Average Claim Time",
            value: "6.2 days",
            change: "-0.8",
            changeType: "positive"
        }
    ];

    // Admin action cards
    const actionCards = [
        {
            id: 1,
            img: relianceInsurer,
            title: "Member Management",
            description: "Add, edit, or deactivate members",
            path: "/admin/members"
        },
        {
            id: 2,
            img: relianceInsurer,
            title: "Claims Processing",
            description: "Review and process pending claims",
            path: "/admin/claims"
        },
        {
            id: 3,
            img: relianceInsurer,
            title: "Policy Management",
            description: "Manage insurance policies and details",
            path: "/admin/policies"
        }
    ];

    return (
        <div className="space-y-8 pb-16 md:pb-0">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
                <Link to="/admin/members">
                    <Button className="bg-covrzy-purple hover:bg-purple-700 w-full md:w-auto">
                        Manage Members
                    </Button>
                </Link>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
                {statsCards.map(stat => (
                    <Card key={stat.id} className="card-shadow">
                        <CardContent className="p-6">
                            <div className="flex justify-between items-start">
                                <div>
                                    <p className="text-sm text-gray-500">{stat.title}</p>
                                    <p className="text-2xl font-bold mt-1">{stat.value}</p>
                                </div>
                                <span className={`text-sm ${stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                                    }`}>
                                    {stat.change}
                                </span>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Action Cards */}
            <div>
                <h2 className="text-xl font-medium text-gray-800 mb-4">Quick Actions</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {actionCards.map(card => (
                        <Card key={card.id} className="card-shadow hover:shadow-md transition-shadow">
                            <CardContent className="p-6">
                                <div className="space-y-4">
                                    <img src={card.img} className="h-10" alt={card.title} />
                                    <div>
                                        <h3 className="font-medium">{card.title}</h3>
                                        <p className="text-sm text-gray-600 mt-1">{card.description}</p>
                                    </div>
                                    <div className="pt-2 text-right">
                                        <Link to={card.path}>
                                            <Button variant="ghost" className="text-covrzy-purple hover:text-purple-700">
                                                Go to {card.title.split(' ')[0]} →
                                            </Button>
                                        </Link>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>

            {/* Recent Activity Section */}
            <div>
                <h2 className="text-xl font-medium text-gray-800 mb-4">Recent Activity</h2>
                <Card className="card-shadow">
                    <CardContent className="p-0">
                        <div className="divide-y">
                            {[1, 2, 3, 4, 5].map((item) => (
                                <div key={item} className="p-4 hover:bg-gray-50">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="font-medium">New claim submitted</p>
                                            <p className="text-sm text-gray-600">Rohit Suresh - Medical reimbursement</p>
                                        </div>
                                        <p className="text-xs text-gray-500">2 hours ago</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>

            {isMobile && (
                <div className="h-16"></div> // Space for mobile navigation
            )}
        </div>
    );
};

export default AdminDashboard;