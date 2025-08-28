import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import {
  Building2,
  Facebook,
  Linkedin,
  Mail,
  Phone,
  Youtube,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

type Faculty = {
  id: string;
  name: string;
  title: string;
  email: string;
  phone: string;
  department: string;
  image: string;
};

const FacultyCard = ({
  id,
  name,
  title,
  email,
  phone,
  department,
  image,
}: Faculty) => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5 }}
      className="w-full"
    >
      <Card className="group overflow-hidden transition-all hover:shadow-lg dark:hover:shadow-blue-900/20 border-border/50 hover:border-primary/30">
        <CardContent className="p-0">
          <motion.div
            className="grid md:grid-cols-[1fr_2fr] gap-6 p-6"
            whileHover={{
              transition: { staggerChildren: 0.1 },
            }}
          >
            {/* Image Section */}
            <motion.div
              className="overflow-hidden rounded-xl relative"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <motion.img
                src={image}
                alt={name}
                className="w-full h-72 object-cover"
                initial={{ scale: 1 }}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </motion.div>

            {/* Content Section */}
            <div className="flex flex-col justify-between">
              <div>
                <motion.div
                  className="space-y-2"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <motion.h2
                    className="text-2xl font-semibold"
                    whileHover={{ x: 2 }}
                  >
                    {name}
                  </motion.h2>

                  <motion.p
                    className="text-sm text-muted-foreground"
                    whileHover={{ x: 2 }}
                  >
                    {title}
                  </motion.p>

                  <motion.div
                    className="flex items-center gap-2 text-sm text-muted-foreground"
                    whileHover={{ x: 2 }}
                  >
                    <Building2 className="w-4 h-4 text-primary" />
                    <span>{department}</span>
                  </motion.div>
                </motion.div>

                {/* Social Icons */}
                <motion.div
                  className="flex gap-4 text-muted-foreground text-lg my-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  {[Linkedin, Facebook, Youtube].map((Icon, idx) => (
                    <motion.div
                      key={idx}
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.9 }}
                      className="hover:bg-muted p-2 rounded-full transition-colors"
                    >
                      <Icon className="w-5 h-5 cursor-pointer" />
                    </motion.div>
                  ))}
                </motion.div>

                {/* Contact Info */}
                <motion.div
                  className="space-y-2 text-sm"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  <motion.p
                    className="flex items-center gap-2 hover:text-primary transition-colors"
                    whileHover={{ x: 2 }}
                  >
                    <Mail className="w-4 h-4 text-primary" />
                    {email}
                  </motion.p>
                  <motion.p
                    className="flex items-center gap-2 hover:text-primary transition-colors"
                    whileHover={{ x: 2 }}
                  >
                    <Phone className="w-4 h-4 text-primary" />
                    {phone}
                  </motion.p>
                </motion.div>
              </div>

              {/* View Profile Button */}
              <motion.div
                className="mt-6"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  className="w-full bg-primary hover:bg-primary/90 transition-colors"
                  onClick={() => navigate("/faculty-details")}
                >
                  View Profile
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default FacultyCard;
