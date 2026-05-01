"use client"

import React, { useState, useRef, useEffect, useCallback } from "react"
import Image from "next/image"
import Link from "next/link"
import StunningLayout from "@/shared/components/layouts/StunningLayout"
import StunningCard from "@/shared/components/cards/StunningCard"
import { 
  Send, 
  User, 
  Globe, 
  Sparkles,
  MessageSquare,
  Trash2,
  Plus,
  ChevronLeft,
  ChevronRight,
  Clock,
  ShoppingBag,
  Search,
  Star,
  Menu,
  X,
  Package,
  HelpCircle,
  TrendingUp,
  Heart,
  ShoppingCart,
  Tag,
  Headphones,
  ImageIcon,
  Camera,
  Loader2,
  Zap,
  DollarSign
} from "lucide-react"
import useUser from "@/hooks/useUser"
import { useStore } from "@/store"
import MarkdownRenderer from "@/shared/components/ui/MarkdownRenderer"
import MessageActions from "@/shared/components/ui/MessageActions"

const EasyAIPage = () => {
  const { user } = useUser()

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-900 via-purple-900 to-fuchsia-900">
      <div className="container mx-auto p-4">
        <h1 className="text-white text-2xl font-bold">AI Assistant</h1>
        <p className="text-white/80">This is a test page</p>
      </div>
    </div>
  )
}

export default EasyAIPage