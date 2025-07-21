import { motion } from 'framer-motion';
const Dashboard = () => {
  return <div className="min-h-screen pt-20 bg-white">
      <section className="py-16 bg-green-600">
        <div className="container mx-auto px-4">
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.8
        }} className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Your Dashboard
            </h1>
            <p className="text-xl text-green-100 max-w-2xl mx-auto">
              Manage your bookings and account information.
            </p>
          </motion.div>
        </div>
      </section>
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              User <span className="text-green-600">Dashboard</span>
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              This is a placeholder for the User Dashboard page. In a complete
              implementation, this would include user bookings, profile
              information, and account management options.
            </p>
          </div>
        </div>
      </section>
    </div>;
};
export default Dashboard;