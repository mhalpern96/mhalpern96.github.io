using System;

namespace week5sprint_1
{
    class Program
    {
        static void Main(string[] args)
        {
            int i = 0;
            int x = 0;
            while(i< 10)
            {
                Console.WriteLine("input a number");
                
                x = x + int.Parse(Console.ReadLine());
                i++;
            }
            Console.WriteLine("the sum is" + x);
            Console.ReadKey();
        }
    }
}
