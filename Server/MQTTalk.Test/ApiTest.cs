using System;
using Xunit;

namespace MQTTalk.Test
{

    public class ApiTest
    {
        [Fact]
        public void FirstTest()
        {
            Assert.Equal(2, 2); // Best test ever! ;)
        }

        [Theory]
        [InlineData(2)]
        [InlineData(4)]
        [InlineData(6)]
        [InlineData(10)]
        public void IsEven(int value)
        {
            Assert.True(value % 2 == 0);
        }

        [Theory]
        [InlineData(1)]
        [InlineData(3)]
        [InlineData(5)]
        public void IsUneven(int value)
        {
            Assert.True(value % 2 != 0);
        }
    }
}
