import type { Prospect } from "@/types/prospect"
import type { Task } from "@/types/task"
import type { Notification } from "@/types/notification"
import type { Contact, MessageTemplate } from "@/types/communication"

export const mockProspects: Prospect[] = [
  {
    id: "prospect-1",
    name: "María López García",
    email: "maria.lopez@example.com",
    phone: "+591 67234567",
    status: "negociación",
    product: "Netflix Premium",
    source: "Facebook",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5), // 5 días atrás
    lastContactDate: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 día atrás
    notes: "Interesada en plan familiar. Tiene 3 hijos adolescentes.",
  },
  {
    id: "prospect-2",
    name: "Carlos Rodríguez Silva",
    email: "carlos.rodriguez@example.com",
    phone: "+591 78345678",
    status: "contactado",
    product: "Disney+ Anual",
    source: "Instagram",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3), // 3 días atrás
    lastContactDate: new Date(Date.now() - 1000 * 60 * 60 * 48), // 2 días atrás
    notes: "Pidió información sobre contenido disponible para niños.",
  },
  {
    id: "prospect-3",
    name: "Ana Martínez Fernández",
    email: "ana.martinez@example.com",
    phone: "+591 69456789",
    status: "nuevo",
    product: "HBO Max",
    source: "TikTok",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 12), // 12 horas atrás
  },
  {
    id: "prospect-4",
    name: "Javier Sánchez Morales",
    email: "javier.sanchez@example.com",
    phone: "+591 76567890",
    status: "ganado",
    product: "Combo Streaming",
    source: "Referido",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 10), // 10 días atrás
    lastContactDate: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 día atrás
    notes: "Cliente satisfecho. Posible fuente de referidos.",
  },
  {
    id: "prospect-5",
    name: "Laura Gómez Herrera",
    email: "laura.gomez@example.com",
    phone: "+591 67678901",
    status: "en conversación",
    product: "Amazon Prime",
    source: "WhatsApp",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // 2 días atrás
    lastContactDate: new Date(Date.now() - 1000 * 60 * 60 * 4), // 4 horas atrás
    notes: "Interesada principalmente en envíos gratis. Preguntó por Prime Video.",
  },
  {
    id: "prospect-6",
    name: "Miguel Torres Jiménez",
    email: "miguel.torres@example.com",
    phone: "+591 78789012",
    status: "perdido",
    product: "Netflix Básico",
    source: "Facebook",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 15), // 15 días atrás
    lastContactDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5), // 5 días atrás
    notes: "Decidió no contratar por precio. Posible recontacto en 3 meses.",
  },
  {
    id: "prospect-7",
    name: "Carmen Ruiz Vega",
    email: "carmen.ruiz@example.com",
    phone: "+591 69890123",
    status: "nuevo",
    product: "Disney+ Mensual",
    source: "Instagram",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 6), // 6 horas atrás
  },
  {
    id: "prospect-8",
    name: "David Fernández Castro",
    email: "david.fernandez@example.com",
    phone: "+591 76901234",
    status: "contactado",
    product: "HBO Max",
    source: "TikTok",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 4), // 4 días atrás
    lastContactDate: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 día atrás
    notes: "Fan de series. Interesado en contenido exclusivo de HBO.",
  },
  {
    id: "prospect-9",
    name: "Elena Díaz Romero",
    email: "elena.diaz@example.com",
    phone: "+591 67012345",
    status: "en conversación",
    product: "Combo Streaming",
    source: "Referido",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7), // 7 días atrás
    lastContactDate: new Date(Date.now() - 1000 * 60 * 60 * 12), // 12 horas atrás
    notes: "Comparando precios con la competencia. Enviar promoción especial.",
  },
  {
    id: "prospect-10",
    name: "Pablo Moreno Delgado",
    email: "pablo.moreno@example.com",
    phone: "+591 78123456",
    status: "negociación",
    product: "Amazon Prime",
    source: "WhatsApp",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 6), // 6 días atrás
    lastContactDate: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 horas atrás
    notes: "Negociando descuento por suscripción anual. Muy interesado.",
  },
  {
    id: "prospect-11",
    name: "Sofía Navarro Mendoza",
    email: "sofia.navarro@example.com",
    phone: "+591 69234567",
    status: "ganado",
    product: "Netflix Premium",
    source: "Facebook",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 12), // 12 días atrás
    lastContactDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // 2 días atrás
    notes: "Cliente satisfecho. Recomendar programa de referidos.",
  },
  {
    id: "prospect-12",
    name: "Alejandro Vega Ruiz",
    email: "alejandro.vega@example.com",
    phone: "+591 76345678",
    status: "perdido",
    product: "Disney+ Anual",
    source: "Instagram",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 20), // 20 días atrás
    lastContactDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 8), // 8 días atrás
    notes: "Encontró mejor oferta con la competencia.",
  },
]

export const mockTasks: Task[] = [
  {
    id: "task-1",
    title: "Llamar a María López",
    description: "Seguimiento sobre interés en plan familiar Netflix Premium",
    status: "pendiente",
    priority: "alta",
    dueDate: new Date(Date.now() + 1000 * 60 * 60 * 2), // 2 horas en el futuro
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 día atrás
    assignedTo: "Juan Pérez",
    relatedTo: {
      type: "prospect",
      id: "prospect-1",
      name: "María López García",
    },
  },
  {
    id: "task-2",
    title: "Enviar información a Carlos Rodríguez",
    description: "Detalles sobre contenido infantil en Disney+",
    status: "completada",
    priority: "media",
    dueDate: new Date(Date.now() - 1000 * 60 * 60 * 12), // 12 horas atrás
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // 2 días atrás
    assignedTo: "Juan Pérez",
    relatedTo: {
      type: "prospect",
      id: "prospect-2",
      name: "Carlos Rodríguez Silva",
    },
  },
  {
    id: "task-3",
    title: "Contactar a Ana Martínez",
    description: "Primer contacto para presentar HBO Max",
    status: "pendiente",
    priority: "alta",
    dueDate: new Date(Date.now() + 1000 * 60 * 60), // 1 hora en el futuro
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 6), // 6 horas atrás
    assignedTo: "Juan Pérez",
    relatedTo: {
      type: "prospect",
      id: "prospect-3",
      name: "Ana Martínez Fernández",
    },
  },
  {
    id: "task-4",
    title: "Seguimiento a Javier Sánchez",
    description: "Verificar satisfacción con Combo Streaming",
    status: "en progreso",
    priority: "baja",
    dueDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 2), // 2 días en el futuro
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 día atrás
    assignedTo: "Juan Pérez",
    relatedTo: {
      type: "prospect",
      id: "prospect-4",
      name: "Javier Sánchez Morales",
    },
  },
  {
    id: "task-5",
    title: "Enviar promoción a Laura Gómez",
    description: "Oferta especial de Amazon Prime",
    status: "vencida",
    priority: "media",
    dueDate: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 día atrás
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3), // 3 días atrás
    assignedTo: "Juan Pérez",
    relatedTo: {
      type: "prospect",
      id: "prospect-5",
      name: "Laura Gómez Herrera",
    },
  },
  {
    id: "task-6",
    title: "Recontactar a Miguel Torres",
    description: "Ofrecer plan con descuento",
    status: "pendiente",
    priority: "baja",
    dueDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30), // 30 días en el futuro
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5), // 5 días atrás
    assignedTo: "Juan Pérez",
    relatedTo: {
      type: "prospect",
      id: "prospect-6",
      name: "Miguel Torres Jiménez",
    },
  },
  {
    id: "task-7",
    title: "Llamar a Carmen Ruiz",
    description: "Primer contacto para Disney+ Mensual",
    status: "pendiente",
    priority: "alta",
    dueDate: new Date(Date.now() + 1000 * 60 * 60 * 4), // 4 horas en el futuro
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 horas atrás
    assignedTo: "Juan Pérez",
    relatedTo: {
      type: "prospect",
      id: "prospect-7",
      name: "Carmen Ruiz Vega",
    },
  },
  {
    id: "task-8",
    title: "Enviar información a David Fernández",
    description: "Detalles sobre series exclusivas en HBO Max",
    status: "en progreso",
    priority: "media",
    dueDate: new Date(Date.now() + 1000 * 60 * 60 * 8), // 8 horas en el futuro
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 día atrás
    assignedTo: "Juan Pérez",
    relatedTo: {
      type: "prospect",
      id: "prospect-8",
      name: "David Fernández Castro",
    },
  },
  {
    id: "task-9",
    title: "Preparar oferta para Elena Díaz",
    description: "Promoción especial de Combo Streaming",
    status: "pendiente",
    priority: "alta",
    dueDate: new Date(Date.now() + 1000 * 60 * 60 * 3), // 3 horas en el futuro
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 12), // 12 horas atrás
    assignedTo: "Juan Pérez",
    relatedTo: {
      type: "prospect",
      id: "prospect-9",
      name: "Elena Díaz Romero",
    },
  },
  {
    id: "task-10",
    title: "Negociar con Pablo Moreno",
    description: "Descuento por suscripción anual a Amazon Prime",
    status: "en progreso",
    priority: "alta",
    dueDate: new Date(Date.now() + 1000 * 60 * 60), // 1 hora en el futuro
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 6), // 6 horas atrás
    assignedTo: "Juan Pérez",
    relatedTo: {
      type: "prospect",
      id: "prospect-10",
      name: "Pablo Moreno Delgado",
    },
  },
  {
    id: "task-11",
    title: "Seguimiento a Sofía Navarro",
    description: "Presentar programa de referidos",
    status: "pendiente",
    priority: "media",
    dueDate: new Date(Date.now() + 1000 * 60 * 60 * 24), // 1 día en el futuro
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // 2 días atrás
    assignedTo: "Juan Pérez",
    relatedTo: {
      type: "prospect",
      id: "prospect-11",
      name: "Sofía Navarro Mendoza",
    },
  },
  {
    id: "task-12",
    title: "Analizar caso de Alejandro Vega",
    description: "Revisar por qué se perdió el cliente",
    status: "completada",
    priority: "baja",
    dueDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3), // 3 días atrás
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7), // 7 días atrás
    assignedTo: "Juan Pérez",
    relatedTo: {
      type: "prospect",
      id: "prospect-12",
      name: "Alejandro Vega Ruiz",
    },
  },
]

export const mockNotifications: Notification[] = [
  {
    id: "notification-1",
    type: "prospect",
    title: "Nuevo prospecto registrado",
    description: "Ana Martínez se ha registrado como nuevo prospecto para HBO Max.",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 12), // 12 horas atrás
    read: false,
    link: "/prospectos",
  },
  {
    id: "notification-2",
    type: "task",
    title: "Tarea vencida",
    description: "La tarea 'Enviar promoción a Laura Gómez' ha vencido.",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 día atrás
    read: true,
    link: "/tareas",
  },
  {
    id: "notification-3",
    type: "message",
    title: "Nuevo mensaje",
    description: "María López ha respondido a tu último mensaje.",
    timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutos atrás
    read: false,
    link: "/comunicaciones",
  },
  {
    id: "notification-4",
    type: "system",
    title: "Actualización del sistema",
    description: "El CRM se ha actualizado a la versión 2.1.0.",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48), // 2 días atrás
    read: true,
  },
  {
    id: "notification-5",
    type: "prospect",
    title: "Prospecto ganado",
    description: "Javier Sánchez ha contratado el Combo Streaming.",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 día atrás
    read: false,
    link: "/prospectos",
  },
  {
    id: "notification-6",
    type: "task",
    title: "Nueva tarea asignada",
    description: "Se te ha asignado la tarea 'Llamar a Carmen Ruiz'.",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 horas atrás
    read: false,
    link: "/tareas",
  },
  {
    id: "notification-7",
    type: "message",
    title: "Nuevo mensaje",
    description: "Laura Gómez ha enviado un nuevo mensaje.",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 15), // 15 minutos atrás
    read: false,
    link: "/comunicaciones",
  },
]

export const mockContacts: Contact[] = [
  {
    id: "contact-1",
    name: "María López García",
    email: "maria.lopez@example.com",
    phone: "+591 67234567",
    status: "negociación",
    product: "Netflix Premium",
    source: "Facebook",
    online: true,
    unreadCount: 3,
    lastMessage: {
      content: "¿Cuándo podríamos agendar una llamada?",
      timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutos atrás
    },
    messages: [
      {
        id: "msg-1",
        content: "Hola María, ¿cómo estás? Vi que estabas interesada en nuestro plan Netflix Premium.",
        sender: "user",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 horas atrás
        status: "read",
        channel: "whatsapp",
      },
      {
        id: "msg-2",
        content: "Hola, sí estoy interesada. ¿Podrías darme más información sobre los precios?",
        sender: "contact",
        timestamp: new Date(Date.now() - 1000 * 60 * 60), // 1 hora atrás
        status: "read",
        channel: "whatsapp",
      },
      {
        id: "msg-3",
        content:
          "Claro, el plan Netflix Premium tiene un costo de €15.99 al mes y permite hasta 4 pantallas simultáneas en calidad 4K.",
        sender: "user",
        timestamp: new Date(Date.now() - 1000 * 60 * 45), // 45 minutos atrás
        status: "read",
        channel: "whatsapp",
      },
      {
        id: "msg-4",
        content: "¿Cuándo podríamos agendar una llamada?",
        sender: "contact",
        timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutos atrás
        status: "read",
        channel: "whatsapp",
      },
    ],
    notes:
      "Cliente muy interesado en el plan familiar. Tiene 3 hijos adolescentes. Prefiere comunicación por WhatsApp. Mejor horario para contactar: tardes.",
  },
  {
    id: "contact-2",
    name: "Carlos Rodríguez Silva",
    email: "carlos.rodriguez@example.com",
    phone: "+591 78345678",
    status: "contactado",
    product: "Disney+ Anual",
    source: "Instagram",
    online: false,
    unreadCount: 0,
    lastMessage: {
      content: "Gracias por la información, lo pensaré.",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3), // 3 horas atrás
    },
    messages: [
      {
        id: "msg-5",
        content: "Hola Carlos, te escribo respecto a tu interés en nuestro plan Disney+ Anual.",
        sender: "user",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5), // 5 horas atrás
        status: "read",
        channel: "whatsapp",
      },
      {
        id: "msg-6",
        content: "Hola, sí me interesa. ¿Cuál es el precio?",
        sender: "contact",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4), // 4 horas atrás
        status: "read",
        channel: "whatsapp",
      },
      {
        id: "msg-7",
        content:
          "El plan anual de Disney+ tiene un costo de €89.90, lo que representa un ahorro del 15% comparado con el plan mensual.",
        sender: "user",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3.5), // 3.5 horas atrás
        status: "read",
        channel: "whatsapp",
      },
      {
        id: "msg-8",
        content: "Gracias por la información, lo pensaré.",
        sender: "contact",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3), // 3 horas atrás
        status: "read",
        channel: "whatsapp",
      },
    ],
    notes: "Interesado en contenido infantil. Recibió información sobre Disney+. No ha tomado una decisión aún.",
  },
  {
    id: "contact-3",
    name: "Ana Martínez Fernández",
    email: "ana.martinez@example.com",
    phone: "+591 69456789",
    status: "nuevo",
    product: "HBO Max",
    source: "TikTok",
    online: true,
    unreadCount: 1,
    lastMessage: {
      content: "¡Hola! Me interesa saber más sobre HBO Max",
      timestamp: new Date(Date.now() - 1000 * 60 * 10), // 10 minutos atrás
    },
    messages: [
      {
        id: "msg-9",
        content: "¡Hola! Me interesa saber más sobre HBO Max",
        sender: "contact",
        timestamp: new Date(Date.now() - 1000 * 60 * 10), // 10 minutos atrás
        status: "read",
        channel: "whatsapp",
      },
    ],
    notes: "Primer contacto. Interesada en HBO Max. Prefiere comunicación por WhatsApp.",
  },
  {
    id: "contact-4",
    name: "Javier Sánchez Morales",
    email: "javier.sanchez@example.com",
    phone: "+591 76567890",
    status: "ganado",
    product: "Combo Streaming",
    source: "Referido",
    online: false,
    unreadCount: 0,
    lastMessage: {
      content: "¡Perfecto! Ya realicé el pago. Gracias por todo.",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 día atrás
    },
    messages: [
      {
        id: "msg-10",
        content: "Hola Javier, ¿cómo va todo con tu suscripción al Combo Streaming?",
        sender: "user",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 25), // 25 horas atrás
        status: "read",
        channel: "whatsapp",
      },
      {
        id: "msg-11",
        content: "¡Todo excelente! Estoy muy contento con el servicio.",
        sender: "contact",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24.5), // 24.5 horas atrás
        status: "read",
        channel: "whatsapp",
      },
      {
        id: "msg-12",
        content: "Me alegra mucho escuchar eso. Recuerda que tu próximo pago vence en 5 días.",
        sender: "user",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24.2), // 24.2 horas atrás
        status: "read",
        channel: "whatsapp",
      },
      {
        id: "msg-13",
        content: "¡Perfecto! Ya realicé el pago. Gracias por todo.",
        sender: "contact",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 24 horas atrás
        status: "read",
        channel: "whatsapp",
      },
    ],
    notes: "Cliente satisfecho con Combo Streaming. Posible fuente de referidos.",
  },
  {
    id: "contact-5",
    name: "Laura Gómez Herrera",
    email: "laura.gomez@example.com",
    phone: "+591 67678901",
    status: "en conversación",
    product: "Amazon Prime",
    source: "WhatsApp",
    online: true,
    unreadCount: 2,
    lastMessage: {
      content: "¿Tienen alguna promoción especial este mes?",
      timestamp: new Date(Date.now() - 1000 * 60 * 15), // 15 minutos atrás
    },
    messages: [
      {
        id: "msg-14",
        content: "Hola Laura, gracias por contactarnos sobre Amazon Prime.",
        sender: "user",
        timestamp: new Date(Date.now() - 1000 * 60 * 60), // 1 hora atrás
        status: "read",
        channel: "whatsapp",
      },
      {
        id: "msg-15",
        content: "Hola, me gustaría saber más sobre los beneficios de Amazon Prime.",
        sender: "contact",
        timestamp: new Date(Date.now() - 1000 * 60 * 55), // 55 minutos atrás
        status: "read",
        channel: "whatsapp",
      },
      {
        id: "msg-16",
        content:
          "Amazon Prime incluye envíos gratis, Prime Video, Prime Music y más por solo €4.99 al mes o €49.90 al año.",
        sender: "user",
        timestamp: new Date(Date.now() - 1000 * 60 * 50), // 50 minutos atrás
        status: "read",
        channel: "whatsapp",
      },
      {
        id: "msg-17",
        content: "Suena interesante. ¿Puedo compartir la cuenta con mi familia?",
        sender: "contact",
        timestamp: new Date(Date.now() - 1000 * 60 * 45), // 45 minutos atrás
        status: "read",
        channel: "whatsapp",
      },
      {
        id: "msg-18",
        content:
          "Sí, puedes compartir los beneficios de Prime con hasta 2 adultos y 4 niños en tu hogar sin costo adicional.",
        sender: "user",
        timestamp: new Date(Date.now() - 1000 * 60 * 40), // 40 minutos atrás
        status: "read",
        channel: "whatsapp",
      },
      {
        id: "msg-19",
        content: "¿Tienen alguna promoción especial este mes?",
        sender: "contact",
        timestamp: new Date(Date.now() - 1000 * 60 * 15), // 15 minutos atrás
        status: "read",
        channel: "whatsapp",
      },
    ],
    notes: "Interesada en envíos gratis y Prime Video. Prefiere comunicación por WhatsApp.",
  },
]

export const mockTemplates: MessageTemplate[] = [
  {
    id: "template-1",
    name: "Bienvenida",
    content:
      "Hola [Nombre], gracias por tu interés en nuestros servicios de streaming. Estamos encantados de poder ayudarte a encontrar la mejor opción para ti. ¿En qué servicio estás más interesado?",
    category: "general",
  },
  {
    id: "template-2",
    name: "Seguimiento",
    content:
      "Hola [Nombre], ¿qué tal va todo? Solo quería hacer un seguimiento de nuestra conversación anterior sobre [Producto]. ¿Has tenido tiempo de revisar la información que te envié?",
    category: "seguimiento",
  },
  {
    id: "template-3",
    name: "Información de precios",
    content:
      "Respecto a los precios de [Producto], actualmente tenemos las siguientes opciones:\n\n- Plan Mensual: €XX.XX\n- Plan Anual: €XX.XX (ahorro del XX%)\n\n¿Cuál te interesaría más?",
    category: "ventas",
  },
  {
    id: "template-4",
    name: "Promoción especial",
    content:
      "¡Tenemos una promoción especial para ti! Si te suscribes a [Producto] antes del [Fecha], obtendrás un 20% de descuento en los primeros 3 meses. ¿Te gustaría aprovechar esta oferta?",
    category: "promociones",
  },
  {
    id: "template-5",
    name: "Confirmación de compra",
    content:
      "¡Excelente noticia, [Nombre]! Tu suscripción a [Producto] ha sido activada correctamente. Puedes comenzar a disfrutar del servicio de inmediato. Si tienes alguna pregunta, no dudes en contactarnos.",
    category: "confirmaciones",
  },
  {
    id: "template-6",
    name: "Recordatorio de pago",
    content:
      "Hola [Nombre], te recordamos que tu próximo pago de [Producto] vence el [Fecha]. Asegúrate de tener tu método de pago actualizado para evitar interrupciones en el servicio.",
    category: "pagos",
  },
  {
    id: "template-7",
    name: "Solicitud de feedback",
    content:
      "Hola [Nombre], esperamos que estés disfrutando de tu suscripción a [Producto]. Nos encantaría conocer tu opinión sobre el servicio. ¿Podrías dedicar unos minutos a responder algunas preguntas?",
    category: "feedback",
  },
]
