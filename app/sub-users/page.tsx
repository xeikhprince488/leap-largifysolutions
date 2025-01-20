'use client'

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Pencil, Trash2 } from 'lucide-react'
import { toast } from "sonner"

interface SubUser {
  id: string
  name: string
  username: string
  role: string
  status: 'active' | 'inactive'
}

export default function SubUsersPage() {
  const [users, setUsers] = useState<SubUser[]>([
    {
      id: '1',
      name: 'John Doe',
      username: 'john.doe',
      role: 'Teacher',
      status: 'active'
    }
  ])

  const [formData, setFormData] = useState({
    name: '',
    username: '',
    password: '',
    role: 'Teacher'
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      // In a real app, this would be an API call
      const newUser: SubUser = {
        id: Date.now().toString(),
        name: formData.name,
        username: formData.username,
        role: formData.role,
        status: 'active'
      }

      setUsers([...users, newUser])
      setFormData({
        name: '',
        username: '',
        password: '',
        role: 'Teacher'
      })

      toast.success('Sub-user added successfully')
    } catch (error) {
      toast.error('Failed to add sub-user')
    }
  }

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this user?')) {
      setUsers(users.filter(user => user.id !== id))
      toast.success('Sub-user deleted successfully')
    }
  }

  return (
    <DashboardLayout>
      <div className="p-8">
        <div className="max-w-6xl mx-auto">
          <header className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold">Sub Users</h1>
              <p className="text-sm text-muted-foreground mt-1">Manage your sub-user accounts</p>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Sub User
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add Sub User</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="username">Username</Label>
                    <Input
                      id="username"
                      required
                      value={formData.username}
                      onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      required
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    />
                  </div>
                  <Button type="submit" className="w-full">Add User</Button>
                </form>
              </DialogContent>
            </Dialog>
          </header>

          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Username</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>{user.name}</TableCell>
                      <TableCell>{user.username}</TableCell>
                      <TableCell>{user.role}</TableCell>
                      <TableCell>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          user.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {user.status}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDelete(user.id)}
                        >
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}

